import { useState, useEffect, useRef, useCallback } from "react";
import { TIMER_SECS } from "../data/topics";
import { playCorrectSound, playWrongSound, playTimeoutSound } from "../utils/soundEffects";

export function useQuiz(questions) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS);
  const [selected, setSelected] = useState(null);
  const [timings, setTimings] = useState([]);
  const [results, setResults] = useState([]);
  const [phase, setPhase] = useState("question");

  const timerRef = useRef(null);
  const startRef = useRef(Date.now());
  const answeredRef = useRef(false); // ✅ track answered without stale closures

  const stopTimer = () => clearInterval(timerRef.current);

  // ✅ Start fresh timer — only called when current changes
  useEffect(() => {
    if (phase === "done") return;

    answeredRef.current = false;
    setAnswered(false);
    setSelected(null);
    setPhase("question");
    setTimeLeft(TIMER_SECS);
    startRef.current = Date.now();

    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => stopTimer();
  }, [current]); // ✅ fires exactly once per question

  // ✅ Handle time-up using ref to avoid stale closure
  useEffect(() => {
    if (timeLeft !== 0) return;
    if (answeredRef.current) return; // already answered, ignore

    answeredRef.current = true;
    stopTimer();
    playTimeoutSound();
    setAnswered(true);
    setSelected(null);
    const q = questions[current];
    setTimings((t) => [...t, TIMER_SECS]);
    setResults((r) => [
      ...r,
      { q: q.q, correct: false, correctAns: q.opts[q.ans], yourAns: "—" },
    ]);
    setPhase("feedback");
  }, [timeLeft]);

  const answer = useCallback((idx) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    stopTimer();
    setAnswered(true);
    setSelected(idx);
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    const q = questions[current];
    const correct = idx === q.ans;
    
    // Play sound effect based on answer correctness
    if (correct) {
      playCorrectSound();
      setScore((s) => s + 1);
    } else {
      playWrongSound();
    }
    
    setTimings((t) => [...t, elapsed]);
    setResults((r) => [
      ...r,
      { q: q.q, correct, correctAns: q.opts[q.ans], yourAns: q.opts[idx] },
    ]);
    setPhase("feedback");
  }, [current, questions]);

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase("done");
    } else {
      setCurrent((c) => c + 1); // ✅ this triggers the timer useEffect above
    }
  }, [current, questions.length]);

  const avgTime = timings.length
    ? Math.round(timings.reduce((a, b) => a + b, 0) / timings.length)
    : 0;
  const pct = Math.round((score / questions.length) * 100);

  return { current, score, answered, timeLeft, selected, results, phase, avgTime, pct, answer, next };
}