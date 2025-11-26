# Quiz Automation — Selenium tests (quiz_automation_sele)

This folder contains a small Selenium-based automation script and a `screenshots/` directory used by tests to save visual evidence.

Files
- `test_quiz.py` — End-to-end automation script (likely Selenium) that launches a browser, navigates to the quiz app, exercises flows (start, pick category/difficulty, answer/skip questions), and captures screenshots. Review the script to see exact test steps and any configurable settings.
- `screenshots/` — Directory where the automation script writes screenshots during a test run. Useful for visual validation and debugging.

Quick start (run the automated test)

1. Start a local web server to serve the `quiz_app` (recommended from the repository root):

   ```bash
   # from /home/aadi/Desktop/quiz_root/quiz_app
   python3 -m http.server 8000
   # then open http://localhost:8000 to verify the app serves
   ```

2. Create and activate a Python virtual environment (optional but recommended):

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install required Python packages. If the project doesn't include a `requirements.txt`, at minimum you'll likely need Selenium:

   ```bash
   pip install selenium
   ```

   If `test_quiz.py` imports other packages, install those as needed.

4. Browser driver: install a matching WebDriver for your browser (e.g., ChromeDriver for Chrome, GeckoDriver for Firefox) and ensure it's on your PATH or update the script to point to the driver executable.

5. Run the test script from the repository root or the folder containing `test_quiz.py`:

   ```bash
   python3 quiz_automation_sele/test_quiz.py
   ```

   The script will typically open a browser, run the flows, and save screenshots in `quiz_automation_sele/screenshots/`.

What to check in `test_quiz.py`
- Target URL: ensure the script targets the correct URL (e.g., `http://localhost:8000` or the appropriate port).
- Waits and selectors: if the test fails due to timing, increase explicit waits or use WebDriverWait with expected conditions.
- Driver setup: ensure the WebDriver path or manager is configured (some scripts use `webdriver-manager` to automatically fetch drivers).

Troubleshooting
- Browser doesn't start: confirm the WebDriver binary is installed and compatible with your browser version.
- No page content / 404: confirm the local static server is running and the correct port is used.
- Element not found: the app's HTML or element IDs/classes may have changed; open DevTools and verify selectors used by `test_quiz.py`.

CI / Automation suggestions
- Create a `requirements.txt` (e.g., `selenium`, optionally `webdriver-manager`) for reproducible installs.
- Use headless browser mode (Chrome/Firefox headless) for CI runs and faster feedback.
- Store failure screenshots with timestamped filenames and upload them as CI artifacts.

Notes
- The script's exact behavior depends on the current contents of `test_quiz.py`. Review that file to confirm assumptions (browser type, waits, selectors, screenshot filenames).
- If you'd like, I can:
  - Add a `requirements.txt` and a small runner script that starts the local server, runs the test headlessly, and collects screenshots.
  - Modify `test_quiz.py` to use `webdriver-manager` for easier driver handling.
