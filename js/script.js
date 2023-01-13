{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });
        render();
    };

    const clearAndFocusInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `<li class="list__item">
                    <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>
                    <span class="list__itemText ${task.done ? "list__itemContent--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </li>`;
        }
        document.querySelector(".js-list").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            clearAndFocusInput(newTask);
            return;
        }
        addNewTask(newTaskContent);
        clearAndFocusInput(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}