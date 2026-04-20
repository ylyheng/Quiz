export default function FeedbackBar({ correct, message }) {
  if (!message) return null;
  return (
    <div className={`feedback-bar ${correct ? "correct" : "wrong"}`}>
      {message}
    </div>
  );
}
