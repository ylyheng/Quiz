export default function TimerPill({ timeLeft }) {
  const warn = timeLeft <= 10;
  return (
    <div className={`timer-pill${warn ? " warn" : ""}`}>
      <span className="timer-pill__ring" />
      {timeLeft}
    </div>
  );
}
