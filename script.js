// Инициализация Telegram WebApp (обязательно для Mini App)
Telegram.WebApp.ready();

// Данные уровней (вставь свои реальные вопросы и фото-ссылки; всего 10+5+7)
const levels = [
    {
        name: 'Уровень 1 (10 вопросов)',
        questions: [
            { text: 'Решите уравнение: x² - 5x + 6 = 0', options: ['x=2, x=3', 'x=1, x=6', 'x=0, x=5', 'x=-2, x=-3'], correct: 0, photo: 'https://example.com/photo1.jpg' },
            { text: 'Найдите площадь треугольника с сторонами 3, 4, 5', options: ['6', '7.5', '10', '12'], correct: 0, photo: null },
            { text: 'Что такое sin(90°)?', options: ['0', '1', '-1', 'undefined'], correct: 1, photo: null },
            { text: 'Упростите: 2x + 3x', options: ['5x', '6x', 'x^2', '5'], correct: 0, photo: null },
            { text: 'Периметр квадрата со стороной 4', options: ['8', '12', '16', '20'], correct: 2, photo: null },
            { text: 'Корень из 16', options: ['2', '4', '8', '16'], correct: 1, photo: null },
            { text: 'Значение cos(0°)', options: ['0', '1', '-1', 'undefined'], correct: 1, photo: null },
            { text: 'Решите: 2x = 10', options: ['x=2', 'x=5', 'x=10', 'x=20'], correct: 1, photo: null },
            { text: 'Площадь круга с радиусом 1 (π=3.14)', options: ['3.14', '6.28', '1', '2'], correct: 0, photo: null },
            { text: 'Факториал 3!', options: ['3', '6', '9', '12'], correct: 1, photo: null }
        ]
    },
    {
        name: 'Уровень 2 (5 вопросов)',
        questions: [
            { text: 'Решите систему: x + y = 5, x - y = 1', options: ['x=3, y=2', 'x=4, y=1', 'x=2, y=3', 'x=5, y=0'], correct: 0, photo: 'https://example.com/photo_level2.jpg' },
            { text: 'Найдите hypotenuse в треугольнике 5-12-?', options: ['13', '15', '17', '10'], correct: 0, photo: null },
            { text: 'Производная x²', options: ['2x', 'x²', '2', 'x'], correct: 0, photo: null },
            { text: 'Интеграл от x dx', options: ['x²/2 + C', 'x + C', 'x² + C', '2x + C'], correct: 0, photo: null },
            { text: 'Вероятность выпадения орла на монете', options: ['0.5', '1', '0', '0.25'], correct: 0, photo: null }
        ]
    },
    {
        name: 'Уровень 3 (7 вопросов)',
        questions: [
            { text: 'Решите: log₂(8) = ?', options: ['2', '3', '4', '8'], correct: 1, photo: null },
            { text: 'Матрица: детерминант [[1,2],[3,4]]', options: ['-2', '2', '-1', '1'], correct: 0, photo: null },
            { text: 'Сумма углов в треугольнике', options: ['180°', '360°', '90°', '270°'], correct: 0, photo: null },
            { text: 'Производная sin(x)', options: ['cos(x)', '-sin(x)', 'sin(x)', '-cos(x)'], correct: 0, photo: null },
            { text: 'Интеграл cos(x) dx', options: ['sin(x) + C', '-cos(x) + C', 'cos(x) + C', '-sin(x) + C'], correct: 0, photo: null },
            { text: 'Число π примерно', options: ['3.14', '2.71', '1.61', '4.0'], correct: 0, photo: null },
            { text: 'Фибоначчи: 1,1,2,3,5,? ', options: ['6', '7', '8', '9'], correct: 2, photo: null }
        ]
    }
];

// Хранение прогресса
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || { completedLevels: [], scores: {} };
let currentLevel = 0;
let currentQuestion = 0;
let score = 0;

// Отображение уровней
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

// Запуск уровня
function startLevel(levelIndex) {
    currentLevel = levelIndex;
    currentQuestion = 0;
    score = 0;
    document.getElementById('level-select').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    showQuestion();
}

// Отображение вопроса
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

// Проверка ответа
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

// Следующий вопрос
document.getElementById('next-btn').onclick = () => {
    currentQuestion++;
    showQuestion();
};

// Завершение уровня
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

// Инициализация
showLevels();
