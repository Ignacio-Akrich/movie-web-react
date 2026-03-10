import React from 'react';
import './Skeleton.scss';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__poster skeleton-shimmer" />
      <div className="skeleton-card__line skeleton-shimmer" />
      <div className="skeleton-card__line skeleton-card__line--short skeleton-shimmer" />
    </div>
  );
}
