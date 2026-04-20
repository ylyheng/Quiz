import ScoreRing from "./ScoreRing";

export default function ResultsScreen({ topic, score, total, avgTime, pct, results, onRestart }) {
  const wrong = total - score;
  const titles = [
    [90, "Outstanding! 🎉"],
    [70, "Great job! 👏"],
    [50, "Not bad! 💪"],
    [0,  "Keep practising! 📚"],
  ];
  const title = titles.find(([t]) => pct >= t)[1];

  return (
    <div className="results-screen animate-fade-up">

      {/* Fixed top section */}
      <div className="results-header">
        <ScoreRing pct={pct} />
        <h2 className="results-title">{title}</h2>
        <p className="results-sub">You scored {score} out of {total} in {topic}</p>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-box__val green">{score}</span>
            <span className="stat-box__lbl">Correct</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__val red">{wrong}</span>
            <span className="stat-box__lbl">Wrong</span>
          </div>
          <div className="stat-box">
            <span className="stat-box__val">{avgTime}s</span>
            <span className="stat-box__lbl">Avg time</span>
          </div>
        </div>
      </div>

      {/* Scrollable review */}
      <div className="review-section">
        <p className="review-section__heading">Answer review</p>
        <div className="review-scroll">
          {results.map((r, i) => (
            <div key={i} className="review-item">
              <span className="review-item__icon">{r.correct ? "✅" : "❌"}</span>
              <div>
                <div className="review-item__q">{r.q}</div>
                <div className="review-item__a">
                  {r.correct
                    ? "Correct"
                    : `Your answer: ${r.yourAns} · Correct: ${r.correctAns}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="results-footer">
        <button onClick={onRestart} className="restart-btn">
          Play Again →
        </button>
      </div>

    </div>
  );
}