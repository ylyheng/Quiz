import { useState } from "react";
import { topics } from "../data/topics";

export default function StartScreen({ onStart }) {
  const [selected, setSelected] = useState(null);

  const hardMode = {
    emoji: "💀",
    name: "Hard",
    description: "100 questions · 30s each",
  };

  return (
    <div className="start-screen animate-fade-up">
      <div className="start-badge">
        <span className="start-badge__dot" />
        Quick Quiz
      </div>

      <h1 className="start-title">
        Test your<br />
        <em>knowledge</em>
      </h1>
      <p className="start-tagline">50 questions · 30 seconds each · instant feedback</p>

      <p className="start-topic-heading">Choose a topic</p>

      <div className="topic-grid">
        {Object.keys(topics).map((t) => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`topic-card${selected === t ? " selected" : ""}`}
          >
            <span className="topic-card__emoji">{topics[t].emoji}</span>
            <span className="topic-card__name">{t}</span>
            <span className="topic-card__count">50 questions · 30s each</span>
          </button>
        ))}

        {/* Hard Mode Card */}
        <button
          onClick={() => setSelected("Hard")}
          className={`topic-card topic-card--hard${selected === "Hard" ? " selected" : ""}`}
        >
          <span className="topic-card__emoji">{hardMode.emoji}</span>
          <span className="topic-card__name">{hardMode.name}</span>
          <span className="topic-card__count">100 questions · 30s each · all topics</span>
        </button>
      </div>

      <button
        onClick={() => selected && onStart(selected)}
        disabled={!selected}
        className="start-btn"
      >
        Start Quiz →
      </button>
    </div>
  );
}