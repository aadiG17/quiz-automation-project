// ========== QUIZ DATA: CATEGORY + DIFFICULTY ==========
const quizData = {
    general: {
        easy: [
            {
                question: "Which is the largest planet in our solar system?",
                options: ["Earth", "Jupiter", "Mars", "Venus"],
                correct: 1
            },
            {
                question: "What color is a ripe banana?",
                options: ["Red", "Yellow", "Green", "Blue"],
                correct: 1
            },
            {
                question: "How many days are there in a leap year?",
                options: ["365", "366", "364", "360"],
                correct: 1
            }
        ],
        medium: [
            {
                question: "Which country is known as the 'Land of the Rising Sun'?",
                options: ["China", "Japan", "Thailand", "South Korea"],
                correct: 1
            },
            {
                question: "Which ocean lies on the east coast of India?",
                options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
                correct: 2
            },
            {
                question: "Who wrote the famous play 'Romeo and Juliet'?",
                options: ["William Shakespeare", "Leo Tolstoy", "Mark Twain", "Jane Austen"],
                correct: 0
            }
        ],
        hard: [
            {
                question: "Which gas is most abundant in the Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 2
            },
            {
                question: "In which year did World War II end?",
                options: ["1939", "1945", "1918", "1965"],
                correct: 1
            },
            {
                question: "What is the capital city of Canada?",
                options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
                correct: 2
            }
        ]
    },
    tech: {
        easy: [
            {
                question: "What does HTML stand for?",
                options: [
                    "HyperText Markup Language",
                    "HighText Machine Language",
                    "Hyperlinks Text Markup Leveler",
                    "Home Tool Management Language"
                ],
                correct: 0
            },
            {
                question: "Which of these is a web browser?",
                options: ["Windows", "Chrome", "Linux", "Android"],
                correct: 1
            },
            {
                question: "Which company created the Android OS?",
                options: ["Apple", "Microsoft", "Google", "IBM"],
                correct: 2
            }
        ],
        medium: [
            {
                question: "Which of these is a JavaScript framework?",
                options: ["Laravel", "React", "Django", "Spring"],
                correct: 1
            },
            {
                question: "Which protocol is used for secure communication over the internet?",
                options: ["HTTP", "FTP", "SMTP", "HTTPS"],
                correct: 3
            },
            {
                question: "In Git, which command is used to upload local changes to remote?",
                options: ["git push", "git commit", "git clone", "git init"],
                correct: 0
            }
        ],
        hard: [
            {
                question: "Big-O notation describes:",
                options: [
                    "Best-case performance only",
                    "Worst-case time/space complexity",
                    "Average speed of CPU",
                    "Storage capacity of RAM"
                ],
                correct: 1
            },
            {
                question: "Which data structure is typically used to implement a recursive function call stack?",
                options: ["Queue", "Stack", "Linked List", "Graph"],
                correct: 1
            },
            {
                question: "In databases, what does ACID stand for?",
                options: [
                    "Atomicity, Consistency, Isolation, Durability",
                    "Accuracy, Clarity, Integrity, Dependency",
                    "Atomicity, Clarity, Isolation, Durability",
                    "Access, Control, Isolation, Durability"
                ],
                correct: 0
            }
        ]
    },
    math: {
        easy: [
            {
                question: "What is 7 + 5?",
                options: ["10", "11", "12", "13"],
                correct: 2
            },
            {
                question: "What is 9 - 3?",
                options: ["6", "7", "5", "8"],
                correct: 0
            },
            {
                question: "What is 3 × 4?",
                options: ["7", "10", "12", "14"],
                correct: 2
            }
        ],
        medium: [
            {
                question: "What is 15 ÷ 3?",
                options: ["4", "5", "6", "3"],
                correct: 1
            },
            {
                question: "Which of these is a prime number?",
                options: ["9", "12", "15", "13"],
                correct: 3
            },
            {
                question: "What is the square of 11?",
                options: ["111", "121", "22", "101"],
                correct: 1
            }
        ],
        hard: [
            {
                question: "If 2x + 3 = 11, what is x?",
                options: ["3", "4", "5", "6"],
                correct: 1
            },
            {
                question: "The next number in the series 2, 5, 11, 23, __ is:",
                options: ["35", "44", "47", "49"],
                correct: 2 // 23*2+1=47
            },
            {
                question: "What is the value of 3! (3 factorial)?",
                options: ["3", "6", "9", "12"],
                correct: 1
            }
        ]
    }
};

// ========== STATE ==========
let selectedCategory = null;
let selectedDifficulty = null;
let currentQuestions = [];
let currentIndex = 0;
let selectedAnswers = [];
let timeSpent = [];
let timerInterval = null;
let timeLeft = 15;
let secondsUsedThisQuestion = 0;

// ========== SCREEN HELPERS ==========
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ========== NAVIGATION FLOW ==========
function goToCategoryScreen() {
    showScreen("category-screen");
}

function backToStart() {
    clearTimer();
    selectedCategory = null;
    selectedDifficulty = null;
    currentQuestions = [];
    currentIndex = 0;
    selectedAnswers = [];
    timeSpent = [];
    showScreen("start-screen");
}

function selectCategory(categoryKey) {
    selectedCategory = categoryKey;
    showScreen("difficulty-screen");
}

function backToCategory() {
    selectedDifficulty = null;
    showScreen("category-screen");
}

function selectDifficulty(difficultyKey) {
    selectedDifficulty = difficultyKey;
    initQuiz();
}

// ========== QUIZ INITIALIZATION ==========
function initQuiz() {
    if (!selectedCategory || !selectedDifficulty) return;
    currentQuestions = quizData[selectedCategory][selectedDifficulty];

    currentIndex = 0;
    selectedAnswers = new Array(currentQuestions.length).fill(null);
    timeSpent = new Array(currentQuestions.length).fill(0);

    // Set labels
    document.getElementById("category-label").innerText =
        "Category: " + prettyCategory(selectedCategory);
    document.getElementById("difficulty-label").innerText =
        "Difficulty: " + prettyDifficulty(selectedDifficulty);

    // Set progress bar color by difficulty
    const bar = document.getElementById("progress-bar");
    if (selectedDifficulty === "easy") {
        bar.style.background = "linear-gradient(90deg, #42e695, #3bb2b8)";
    } else if (selectedDifficulty === "medium") {
        bar.style.background = "linear-gradient(90deg, #f6d365, #fda085)";
    } else {
        bar.style.background = "linear-gradient(90deg, #f5515f, #a1051d)";
    }

    showScreen("quiz-screen");
    loadQuestion();
}

// Helpers to display names
function prettyCategory(cat) {
    switch (cat) {
        case "general": return "General Knowledge";
        case "tech": return "Technology";
        case "math": return "Maths & Logic";
        default: return cat;
    }
}

function prettyDifficulty(d) {
    switch (d) {
        case "easy": return "Easy";
        case "medium": return "Medium";
        case "hard": return "Hard";
        default: return d;
    }
}

// ========== QUESTION HANDLING ==========
function loadQuestion() {
    clearTimer();
    const q = currentQuestions[currentIndex];
    if (!q) {
        showResults();
        return;
    }

    // Question count and progress
    document.getElementById("question-count").innerText =
        `Question ${currentIndex + 1} of ${currentQuestions.length}`;

    const progressPercent = (currentIndex / currentQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;

    // Question text
    document.getElementById("question-text").innerText = q.question;

    // Options
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, idx) => {
        const div = document.createElement("div");
        div.classList.add("option");
        if (selectedAnswers[currentIndex] === idx) {
            div.classList.add("selected");
        }
        div.innerText = opt;
        div.onclick = () => selectAnswer(idx, div);
        optionsDiv.appendChild(div);
    });

    // Start timer for this question
    startTimer();
}

function selectAnswer(index, element) {
    // store selected
    selectedAnswers[currentIndex] = index;

    // highlight UI
    document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    element.classList.add("selected");

    // move to next after a short delay (for user feedback)
    setTimeout(nextQuestion, 350);
}

function skipQuestion() {
    // skip means we don't change selectedAnswers[currentIndex] (remains null)
    nextQuestion();
}

// ========== TIMER ==========
function startTimer() {
    timeLeft = 15;
    secondsUsedThisQuestion = 0;
    updateTimerLabel();

    timerInterval = setInterval(() => {
        timeLeft--;
        secondsUsedThisQuestion++;
        updateTimerLabel();
        if (timeLeft <= 0) {
            timeSpent[currentIndex] = secondsUsedThisQuestion;
            nextQuestion();
        }
    }, 1000);
}

function updateTimerLabel() {
    const timerEl = document.getElementById("timer");
    timerEl.innerText = `⏱ ${timeLeft}s`;
}

function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ========== MOVE TO NEXT QUESTION ==========
function nextQuestion() {
    clearTimer();

    // If user answered quickly, record the actual time used
    if (secondsUsedThisQuestion > 0 && timeSpent[currentIndex] === 0) {
        timeSpent[currentIndex] = secondsUsedThisQuestion;
    } else if (timeSpent[currentIndex] === 0) {
        // If somehow zero, assume used full time
        timeSpent[currentIndex] = 15;
    }

    currentIndex++;
    if (currentIndex >= currentQuestions.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

// ========== RESULTS ==========
function showResults() {
    clearTimer();
    showScreen("result-screen");

    // Fill the progress bar fully
    document.getElementById("progress-bar").style.width = "100%";

    // Calculate correct / wrong
    let correctCount = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (selectedAnswers[i] === currentQuestions[i].correct) {
            correctCount++;
        }
    }
    const total = currentQuestions.length;
    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    // Score summary
    const scoreText = document.getElementById("score-text");
    scoreText.innerHTML =
        `Category: <b>${prettyCategory(selectedCategory)}</b> &nbsp;|&nbsp; ` +
        `Difficulty: <b>${prettyDifficulty(selectedDifficulty)}</b><br>` +
        `Score: <b>${correctCount}</b> / <b>${total}</b> &nbsp;(` +
        `<b>${percentage}%</b>)<br>` +
        `Correct: ${correctCount} &nbsp;|&nbsp; Wrong / Skipped: ${wrongCount}`;

    // Feedback message
    const feedback = document.getElementById("feedback-text");
    if (percentage >= 80) {
        feedback.innerText = "Awesome! You're a quiz pro 🚀";
    } else if (percentage >= 50) {
        feedback.innerText = "Nice work! Keep practicing and you'll master this 💪";
    } else {
        feedback.innerText = "Don't worry, keep trying and you'll improve quickly 🙂";
    }

    // Generate charts
    generateCharts(correctCount, wrongCount);
}

function generateCharts(correct, wrong) {
    // Correct vs Wrong pie
    const ctx1 = document.getElementById("correctWrongChart").getContext("2d");
    new Chart(ctx1, {
        type: "pie",
        data: {
            labels: ["Correct", "Wrong/Skipped"],
            datasets: [{
                data: [correct, wrong],
                backgroundColor: ["#42e695", "#ff6a88"]
            }]
        },
        options: {
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });

    // Time per question bar
    const ctx2 = document.getElementById("timeChart").getContext("2d");
    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: currentQuestions.map((_, idx) => `Q${idx + 1}`),
            datasets: [{
                label: "Time Spent (s)",
                data: timeSpent,
                backgroundColor: "#3bb2b8"
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

// ========== RESTART ==========
function restartQuiz() {
    selectedDifficulty = null;
    selectedCategory = null;
    currentQuestions = [];
    currentIndex = 0;
    selectedAnswers = [];
    timeSpent = [];
    clearTimer();
    showScreen("start-screen");
}
