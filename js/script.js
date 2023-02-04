{
    let tasks = [];
    let hideDoneTasks = false;

    const hideShowTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        render();
    };

    const clearAndFocusInput = (newTaskElement) => {
        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString +=
                `<li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                    <button class="list__button list__button--done js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__itemText ${task.done ? "list__itemContent--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>`;
        }
        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";
        if (tasks.length > 0) {
            htmlButtons +=
                `<button class="section__button js-hideShow">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button ${tasks.every(task => task.done) ? "disabled" : ""} class="section__button js-doneAll">
                    Ukończ wszystkie
                </button>`;
        }
        document.querySelector(".js-buttonsContainer").innerHTML = htmlButtons;
    };

    const bindEvents = () => {
        const toggleDoneBottons = document.querySelectorAll(".js-done");
        toggleDoneBottons.forEach((toggleDoneBotton, index) => {
            toggleDoneBotton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeBottons = document.querySelectorAll(".js-remove");
        removeBottons.forEach((removeBotton, index) => {
            removeBotton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const hideShowButton = document.querySelector(".js-hideShow");
        if (hideShowButton) {
            hideShowButton.addEventListener("click", hideShowTask);
        }

        const doneAllButton = document.querySelector(".js-doneAll");
        if (doneAllButton) {
            doneAllButton.addEventListener("click", toggleAllTasksDone);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        
        if (newTaskContent === "") {
            clearAndFocusInput(newTaskElement);
            return;
        }

        addNewTask(newTaskContent);
        clearAndFocusInput(newTaskElement);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}