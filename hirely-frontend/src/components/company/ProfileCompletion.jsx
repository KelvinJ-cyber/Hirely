/**
 * Profile completion progress card with missing field hints.
 *
 * @param {{ percentage: number, hint?: string }} props
 */
export function ProfileCompletion({ percentage = 0, hint = '' }) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className="sidebar-card">
      <div className="completion-header">
        <span className="completion-label">Profile Strength</span>
        <span className="completion-pct">{clamped}%</span>
      </div>

      <div className="completion-bar-track">
        <div
          className="completion-bar-fill"
          style={{ width: `${clamped}%` }}
        />
      </div>

      {hint && <p className="completion-hint">{hint}</p>}
    </div>
  );
}
