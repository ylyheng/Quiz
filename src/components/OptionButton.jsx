const LETTERS = ["A", "B", "C", "D"];

export default function OptionButton({ index, text, state, onClick }) {
  const cls = ["option-btn", state !== "idle" ? state : ""].join(" ").trim();
  return (
    <button
      onClick={onClick}
      disabled={state !== "idle"}
      className={cls}
    >
      <span className="option-btn__key">{LETTERS[index]}</span>
      {text}
    </button>
  );
}
