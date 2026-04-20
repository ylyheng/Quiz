# Quiz App — React

A fully functional quiz app built with React 18 + Vite, with all styling in a single CSS file.

## File Structure

```
quiz-app/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies (React 18 + Vite)
├── vite.config.js               # Vite bundler config
└── src/
    ├── main.jsx                 # React root — imports styles.css here
    ├── App.jsx                  # Root component — screen router
    ├── styles.css               # ALL styles for every component (single file)
    │
    ├── data/
    │   └── topics.js            # 60 questions + TIMER_SECS constant
    │
    ├── hooks/
    │   └── useQuiz.js           # Custom hook — all quiz game logic
    │
    └── components/
        ├── StartScreen.jsx      # Topic picker + start button
        ├── QuizScreen.jsx       # Main quiz UI
        ├── ResultsScreen.jsx    # Score, stats, answer review
        ├── ProgressBar.jsx      # Animated progress bar
        ├── TimerPill.jsx        # 30s countdown pill
        ├── OptionButton.jsx     # Single answer option
        ├── FeedbackBar.jsx      # Correct/wrong feedback message
        └── ScoreRing.jsx        # Animated SVG score ring
```

## CSS Architecture

All styles live in `src/styles.css`, organised into clearly labelled sections:

- Reset & Base
- CSS Custom Properties (design tokens)
- Animations (@keyframes)
- Start Screen
- Quiz Screen
- Progress Bar
- Timer Pill
- Option Button
- Feedback Bar
- Results Screen
- Responsive (@media)

Components use semantic class names (e.g. `.option-btn`, `.option-btn.correct`, `.timer-pill.warn`).
No inline styles, no CSS-in-JS — just one clean CSS file.

## Setup & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```
"# Quiz" 
