document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('openForm');
    const taskForm = document.getElementById('taskForm');
    const cancelFormButton = document.getElementById('cancelForm');
    const addTaskButton = document.getElementById('addTask');
    const taskInput = document.getElementById('taskInput');
    const taskHoursInput = document.getElementById('taskHours');
    const taskMinutesInput = document.getElementById('taskMinutes');
    const taskSecondsInput = document.getElementById('taskSeconds');
    const taskList = document.getElementById('taskList');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const navigateButton = document.getElementById('home');
    navigateButton.addEventListener('click', () => {
        window.location.href = 'quiet_html.html'; // The URL of the page to navigate to
     });
    // Reference to the audio element
    const endSound = document.getElementById('endSound');

    const timers = {}; // Object to keep track of active timers

    function startCountdown(taskElement, hours, minutes, seconds) {
        const taskId = Date.now();
        timers[taskId] = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(timers[taskId]);
                        endSound.pause();
                        endSound.currentTime = 0;
                        try {
                            // Attempt to play the sound
                            endSound.play().catch((error) => {
                                console.error('Error playing sound:', error);
                            });
                        } catch (error) {
                            console.error('Error playing sound:', error);
                        }
                        alert(`Time's up for task: ${taskElement.dataset.taskText}`);
                        taskElement.querySelector('.countdown').textContent = "Time's up!";
                        taskElement.classList.add('completed');
                        delete timers[taskId];
                        return;
                    }
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
                seconds = 59;
            } else {
                seconds--;
            }
            taskElement.querySelector('.countdown').textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        }, 1000);

        taskElement.dataset.timerId = taskId;
    }

    function createTaskElement(taskText, hours, minutes, seconds) {
        const li = document.createElement('li');
        li.dataset.taskText = taskText;
        li.textContent = `${taskText} - `;
        const countdown = document.createElement('span');
        countdown.className = 'countdown';
        countdown.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        li.appendChild(countdown);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            if (li.classList.contains('completed')) {
                clearInterval(timers[li.dataset.timerId]);
                delete timers[li.dataset.timerId];
                endSound.pause();
                endSound.currentTime = 0;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            clearInterval(timers[li.dataset.timerId]);
            delete timers[li.dataset.timerId];
            li.remove();
            endSound.pause();
            endSound.currentTime = 0;
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        startCountdown(li, hours, minutes, seconds);

        return li;
    }

    openFormButton.addEventListener('click', () => {
        taskForm.classList.remove('hidden');
    });

    cancelFormButton.addEventListener('click', () => {
        taskForm.classList.add('hidden');
        taskInput.value = '';
        taskHoursInput.value = 0;
        taskMinutesInput.value = 0;
        taskSecondsInput.value = 0;
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const hours = parseInt(taskHoursInput.value, 10) || 0;
        const minutes = parseInt(taskMinutesInput.value, 10) || 0;
        const seconds = parseInt(taskSecondsInput.value, 10) || 0;

        if (taskText) {
            const taskElement = createTaskElement(taskText, hours, minutes, seconds);
            taskList.appendChild(taskElement);
            taskForm.classList.add('hidden');
            taskInput.value = '';
            taskHoursInput.value = 0;
            taskMinutesInput.value = 0;
            taskSecondsInput.value = 0;
        }
    });

    // Optional: Allow pressing Enter to add tasks
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Dark Mode Toggle
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
