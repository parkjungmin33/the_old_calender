//오늘의 날짜, 요일
window.addEventListener("load", function () {
    const dateDisplay = document.getElementById("dateDisplay");
    const todoInput = document.getElementById("todoInput");
    const addButton = document.getElementById("addButton");
    const todoList = document.getElementById("todoList");


    // 오늘 날짜와 요일을 가져오는 함수
    function getTodayDateAndDay() {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const months = [
            "1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
        ];
        const today = new Date();
        const month = months[today.getMonth()];
        const date = today.getDate();
        const dayOfWeek = daysOfWeek[today.getDay()];
        return { month, date, dayOfWeek };
    }

    //날짜와 요일 표시
    function displayDateAndDay() {
        const { month, date, dayOfWeek } = getTodayDateAndDay();
        dateDisplay.textContent = `${month} ${date}일 (${dayOfWeek})`;
    }

    let todos = [];

    function toggleTodoCompletion(index) {
        todos[index].completed = !todos[index].completed;
        updateTodoList();
        saveToLocalStorage();
      }

    // To-Do List에 아이템 추가
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
          todos.push({ text: todoText, completed: false });
          updateTodoList();
          saveToLocalStorage();
          todoInput.value = "";
        }
      }

      //엔터 쳐서 추가 가능
      todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // To-Do List에 아이템 삭제
    function deleteTodo(index) {
        todos.splice(index, 1);
        updateTodoList();
        saveToLocalStorage();
    }

    // To-Do List에 아이템 수정
    function editTodo(index, newText) {
        if (todos[index].text !== newText) {
            todos[index].text = newText;
            updateTodoList();
            saveToLocalStorage();
        }
    }

    // To-Do List 표시 업데이트
    function updateTodoList() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
          const listItem = document.createElement("li");
      
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.addEventListener("click", () => {
            toggleTodoCompletion(index);
          });
      
          listItem.appendChild(checkbox);
      
          const todoTextSpan = document.createElement("span");
          todoTextSpan.textContent = todo.text;
          
          if (todo.completed) {
            todoTextSpan.style.textDecoration = "line-through";
          }
          listItem.appendChild(todoTextSpan);
      
          const editButton = document.createElement("button");
          editButton.textContent = "수정";
          editButton.addEventListener("click", () => {
            const newText = prompt("수정할 내용을 입력하세요:", todo.text);
            if (newText !== null) {
              editTodo(index, newText);
            }
          });
      
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.addEventListener("click", () => {
            deleteTodo(index);
          });
      
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
          todoList.appendChild(listItem);
        });
      }

    // To-Do List 아이템을 로컬 스토리지에 저장
    function saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // 페이지 로드 시 이전에 저장한 To-Do List 아이템을 불러옴
    function loadFromLocalStorage() {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            updateTodoList();
        }
    }

    addButton.addEventListener("click", addTodo);

    displayDateAndDay();
    loadFromLocalStorage();
});
