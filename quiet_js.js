// script.js

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const storedTheme = localStorage.getItem('theme');
    const navigateButton = document.getElementById('navigateButton1');
    const navigateButton1 = document.getElementById('navigateButton6');
    const navigateButton2 = document.getElementById('navigateButton3');
    const navigateButton3 = document.getElementById('navigateButton4');
    const navigateButton4 = document.getElementById('navigateButton5');
    const navigateButton5 = document.getElementById('navigateButton2');
    navigateButton.addEventListener('click', () => {
        window.location.href = 'task manager.html'; // The URL of the page to navigate to
    });
    navigateButton1.addEventListener('click', () => {
        window.location.href = 'equation.html'; // The URL of the page to navigate to
    });
    navigateButton2.addEventListener('click', () => {
        window.location.href = 'pop_it.html'; // The URL of the page to navigate to
    });
    navigateButton3.addEventListener('click', () => {
        window.location.href = 'meditate.html'; // The URL of the page to navigate to
    });
    navigateButton4.addEventListener('click', () => {
        window.location.href = 'exersise.html'; // The URL of the page to navigate to
    });
    navigateButton5.addEventListener("click", () =>{
        window.location.href = 'sleep.html';
    })
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});
    const navigateButton = document.getElementById('navigateButton');
    
    navigateButton.addEventListener('click', () => {
        window.location.href = 'about.html'; // The URL of the page to navigate to
    });
