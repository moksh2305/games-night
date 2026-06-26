'use client';

import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';

interface PostHogPageTrackerProps {
  eventName: string;
  properties?: Record<string, any>;
}

export default function PostHogPageTracker({ eventName, properties }: PostHogPageTrackerProps) {
  const posthog = usePostHog();
  const tracked = useRef(false);

  useEffect(() => {
    if (posthog && !tracked.current) {
      posthog.capture(eventName, properties);
      tracked.current = true;
    }
  }, [posthog, eventName, properties]);

  return null;
}
