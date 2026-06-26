import 'server-only';

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

async function executeHogQL(query: string) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) return null;

  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: query,
        }
      }),
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!res.ok) {
      console.error('PostHog API Error:', await res.text());
      return null;
    }

    const data = await res.json();
    return data.results;
  } catch (e) {
    console.error('Failed to execute HogQL:', e);
    return null;
  }
}

export async function getAnalyticsMetrics() {
  const [
    pageviewsResult,
    uniqueVisitorsResult,
    topPagesResult,
    topBrowsersResult,
    trafficSourcesResult
  ] = await Promise.all([
    executeHogQL(`SELECT count() FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY`),
    executeHogQL(`SELECT count(distinct distinct_id) FROM events WHERE timestamp >= now() - INTERVAL 7 DAY`),
    executeHogQL(`SELECT properties.$pathname, count() as c FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY GROUP BY properties.$pathname ORDER BY c DESC LIMIT 5`),
    executeHogQL(`SELECT properties.$browser, count() as c FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY GROUP BY properties.$browser ORDER BY c DESC LIMIT 4`),
    executeHogQL(`SELECT properties.$referring_domain, count() as c FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 7 DAY GROUP BY properties.$referring_domain ORDER BY c DESC LIMIT 4`)
  ]);

  return {
    totalPageviews: pageviewsResult?.[0]?.[0] || 0,
    uniqueVisitors: uniqueVisitorsResult?.[0]?.[0] || 0,
    topPages: topPagesResult?.map((row: any) => ({ path: row[0] || '/', views: row[1] })) || [],
    topBrowsers: topBrowsersResult?.map((row: any) => ({ browser: row[0] || 'Unknown', count: row[1] })) || [],
    trafficSources: trafficSourcesResult?.map((row: any) => ({ source: row[0] || 'Direct', count: row[1] })) || [],
  };
}
