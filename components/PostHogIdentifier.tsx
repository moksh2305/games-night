'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

interface PostHogIdentifierProps {
  user: {
    id?: string | null;
    email?: string | null;
    name?: string | null;
  } | null;
}

export default function PostHogIdentifier({ user }: PostHogIdentifierProps) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog && user?.id) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    }
  }, [posthog, user]);

  return null;
}
