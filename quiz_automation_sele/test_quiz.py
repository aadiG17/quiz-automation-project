from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import os

# Create screenshots folder
if not os.path.exists("screenshots"):
    os.makedirs("screenshots")

def screenshot(name, driver):
    driver.save_screenshot(f"screenshots/{name}.png")

# FIXED DRIVER SETUP
options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

driver.maximize_window()

# Change path to your quiz location
driver.get("file:///home/aadi/Desktop/quiz_root/quiz_app/index.html")
time.sleep(1)

print("===== TEST STARTED =====")
screenshot("01_landing", driver)

# Start quiz
driver.find_element(By.XPATH, "//button[contains(text(),'Start Your Journey')]").click()
time.sleep(1)
screenshot("02_category", driver)

# Select category
driver.find_element(By.XPATH, "//h3[contains(text(),'General Knowledge')]").click()
time.sleep(1)
screenshot("03_difficulty", driver)

# Select difficulty
driver.find_element(By.XPATH, "//button[contains(text(),'Easy')]").click()
time.sleep(1)
screenshot("04_first_question", driver)

# Loop through questions
for i in range(1, 20):
    time.sleep(0.7)

    try:
        question_text = driver.find_element(By.ID, "question-text").text
        print(f"Q{i}: {question_text}")
    except:
        print("No more questions.")
        break

    # Click first option
    driver.find_element(By.CSS_SELECTOR, ".option").click()
    screenshot(f"answer_q{i}", driver)

# Wait for results
time.sleep(2)
screenshot("05_result_screen", driver)

print("===== TEST FINISHED =====")
driver.quit()
