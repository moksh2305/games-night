'use client';

import { usePostHog } from 'posthog-js/react';

export default function CategoryChips() {
  const posthog = usePostHog();

  const handleCategoryClick = (category: string) => {
    if (posthog) {
      posthog.capture('category_clicked', { category });
    }
    // In a real implementation this would also filter the events on the page
  };

  return (
    <div className="category-chips">
      <button className="chip active" onClick={() => handleCategoryClick('All Events')}>All Events</button>
      <button className="chip" onClick={() => handleCategoryClick('Board Games')}>Board Games</button>
      <button className="chip" onClick={() => handleCategoryClick('Poker')}>Poker</button>
      <button className="chip" onClick={() => handleCategoryClick('Retro Games')}>Retro Games</button>
      <button className="chip" onClick={() => handleCategoryClick('Trivia')}>Trivia</button>
    </div>
  );
}
