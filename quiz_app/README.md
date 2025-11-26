# Quiz Galaxy — Frontend (quiz_app)

This folder contains a small browser-based interactive quiz application. It includes the main UI, styling, and client-side logic.

Files
- `index.html` — Single-page UI. Defines the start, category, difficulty, quiz, and result sections and loads `script.js` and `style.css`.
- `script.js` — Client-side JavaScript that controls navigation, quiz flow, timer, scoring, and rendering charts (uses Chart.js via CDN).
- `style.css` — Styling and layout for the app (cards, buttons, progress, charts, responsive rules).
- `index.php` — (optional) PHP entry; the app is static and works by opening `index.html`. `index.php` can be ignored for a static file preview.

Quick start (development / local testing)
1. Static preview (simplest):
   - Open the file `index.html` in your browser (double-click or "Open File" in your editor). No server required for basic functionality.

2. Local HTTP server (recommended for consistent behavior):
   - From the `quiz_app` folder run a simple local server. Example with Python 3:
     ```bash
     python3 -m http.server 8000
     ```
   - Then open http://localhost:8000 in your browser.

Notes and dependencies
- Charting: The app uses Chart.js via CDN (loaded in `index.html`). An internet connection is required for the chart visualizations unless you vendor the library locally.
- The UI expects `script.js` to provide the functions used in the markup (for example `goToCategoryScreen()`, `selectCategory()`, `selectDifficulty()`, `skipQuestion()`, and `restartQuiz()`).

Development tips
- Edits to `script.js` control quiz behavior (timers, scoring, question progression). Keep logic modular where possible.
- If adding new question data or categories, update the arrays/data structures inside `script.js`.
- When changing visuals, update `style.css`. The app is responsive but test on small screens.

Testing / Automation
- There's an automation folder at the repository root (`quiz_automation_sele/test_quiz.py`) that contains Selenium-based automation scripts (if present). Use it to run end-to-end checks or screenshot-based assertions.

Troubleshooting
- Blank charts: ensure the browser can reach the Chart.js CDN or add a local copy.
- Timer or UI not responding: open the browser console (DevTools) to inspect JS errors in `script.js`.


