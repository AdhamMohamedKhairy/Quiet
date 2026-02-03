document.addEventListener('DOMContentLoaded', () => {
    const navigateButton = document.getElementById('home');
    navigateButton.addEventListener('click', () => {
        window.location.href = 'quiet_html.html'; // The URL of the page to navigate to
    });
});

let score = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation() {
    const type = getRandomInt(1, 2); // Decide the type of equation

    let equation;
    let answer;

    if (type === 1) {
        // x + a = b
        const a = getRandomInt(1, 10);
        const x = getRandomInt(1, 10);
        const b = x + a;
        answer = x;
        equation = `x + ${a} = ${b}`;
    } else {
        // ax + b = c
        const a = getRandomInt(1, 10);
        const x = getRandomInt(1, 10);
        const b = getRandomInt(1, 10);
        const c = a * x + b;
        answer = x;
        equation = `${a}x + ${b} = ${c}`;
    }

    return { equation, answer };
}

function updateEquation() {
    const { equation, answer } = generateEquation();
    const equationElement = document.getElementById('equation');
    equationElement.innerText = equation;
    equationElement.dataset.answer = answer;
}

document.getElementById('check-answer').addEventListener('click', () => {
    const userAnswer = parseInt(document.getElementById('input-answer').value);
    const correctAnswer = parseInt(document.getElementById('equation').dataset.answer);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('message').innerText = 'Good job!';
    } else {
        document.getElementById('message').innerText = 'Wrong!';
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('input-answer').value = '';
    updateEquation();
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

updateEquation();

