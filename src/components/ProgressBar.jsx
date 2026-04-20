export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
