import ProgressBar from "./ProgressBar";
import TimerPill from "./TimerPill";
import OptionButton from "./OptionButton";
import FeedbackBar from "./FeedbackBar";
import { useQuiz } from "../hooks/useQuiz";

export default function QuizScreen({ topic, questions, onFinish, onExit }) {
  const {
    current, score, answered, timeLeft,
    selected, results, phase, avgTime, pct, answer, next,
  } = useQuiz(questions);

  const q = questions[current];
  const total = questions.length;
  const isLast = current + 1 >= total;

  const getOptionState = (idx) => {
    if (!answered) return "idle";
    if (idx === q.ans) return "correct";
    if (idx === selected) return "wrong";
    return "dimmed";
  };

  const lastResult = results[results.length - 1];
  const feedbackMsg = answered
    ? lastResult?.correct
      ? "✓ Correct! Great job."
      : lastResult?.yourAns === "—"
      ? "⏱ Time's up! Correct answer highlighted above."
      : `✗ Wrong. Correct answer: ${q.opts[q.ans]}`
    : null;

  if (phase === "done") {
    onFinish({ score, total, avgTime, pct, results });
    return null;
  }

  return (
    <div className="animate-fade-up">
      <div className="quiz-top-bar">
        <button onClick={onExit} className="quiz-exit-btn">✕</button>
        <span className="quiz-q-num">Question {current + 1} of {total}</span>
        <div className="quiz-score-pill">Score: <strong>{score}</strong></div>
        <TimerPill timeLeft={timeLeft} />
      </div>

      <ProgressBar current={current} total={total} />

      <div className="question-card">
        <div className="question-card__category">{topic}</div>
        <div className="question-card__text">{q.q}</div>
      </div>

      <div className="options-list">
        {q.opts.map((opt, i) => (
          <OptionButton
            key={i}
            index={i}
            text={opt}
            state={getOptionState(i)}
            onClick={() => answer(i)}
          />
        ))}
      </div>

      <FeedbackBar correct={lastResult?.correct} message={feedbackMsg} />

      {answered && (
        <button onClick={next} className="quiz-next-btn">
          {isLast ? "See Results →" : "Next →"}
        </button>
      )}
    </div>
  );
}