Telegram.WebApp.ready();

const levels = [
    // ... уровни из моего прошлого ответа
    // Вставь все 10 + 5 + 7 вопросов!
];

let userProgress = JSON.parse(localStorage.getItem('userProgress')) || { completedLevels: [], scores: {} };
let currentLevel = 0;
let currentQuestion = 0;
let score = 0;

function showLevels() {
    const levelSelect = document.getElementById('level-select');
    levelSelect.innerHTML = '<h2>Выберите уровень:</h2>';
    levels.forEach((level, index) => {
        const isCompleted = userProgress.completedLevels.includes(index);
        const isUnlocked = index <= userProgress.completedLevels.length;
        const button = document.createElement('button');
        button.textContent = isCompleted ? `${level.name} (пройден)` : level.name;
        button.disabled = !isUnlocked;
        button.onclick = () => startLevel(index);
        levelSelect.appendChild(button);
    });
}
function startLevel(levelIndex) {
    currentLevel = levelIndex;
    currentQuestion = 0;
    score = 0;
    document.getElementById('level-select').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    showQuestion();
}
function showQuestion() {
    const level = levels[currentLevel];
    if (currentQuestion >= level.questions.length) {
        finishLevel();
        return;
    }
    const q = level.questions[currentQuestion];
    document.getElementById('question-text').textContent = q.text;
    const photo = document.getElementById('question-photo');
    if (q.photo) {
        photo.src = q.photo;
        photo.style.display = 'block';
    } else {
        photo.style.display = 'none';
    }
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'option';
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
    document.getElementById('next-btn').style.display = 'none';
}
function checkAnswer(selected) {
    const q = levels[currentLevel].questions[currentQuestion];
    if (selected === q.correct) {
        score++;
        alert('Правильно! +1 очко');
    } else {
        alert(`Неправильно. Правильный: ${q.options[q.correct]}`);
    }
    document.getElementById('next-btn').style.display = 'block';
}
document.getElementById('next-btn').onclick = () => {
    currentQuestion++;
    showQuestion();
};
function finishLevel() {
    const total = levels[currentLevel].questions.length;
    const percentage = (score / total) * 100;
    userProgress.scores[currentLevel] = score;
    if (percentage >= 80) {
        if (!userProgress.completedLevels.includes(currentLevel)) {
            userProgress.completedLevels.push(currentLevel);
        }
        alert(`Уровень пройден! Очки: ${score}/${total} (${percentage.toFixed(0)}%). Следующий открыт!`);
    } else {
        alert(`Очки: ${score}/${total} (${percentage.toFixed(0)}%). Нужно ≥80% для прохождения. Попробуй снова!`);
    }
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    document.getElementById('question').style.display = 'none';
    document.getElementById('level-select').style.display = 'block';
    showLevels();
}
showLevels();
