var todos = JSON.parse(localStorage.getItem("todos")) || [];
var addTodo = document.getElementById("add-todo");
const quotes = [
    "“Do the hard jobs first. The easy jobs will take care of themselves.”",
    "“Focus on being productive instead of busy.”",
    "“It’s not always that we need to do more but rather that we need to focus on less.”",
    "“Productivity is being able to do things that you were never able to do before.”",
    "“Sometimes, things may not go your way, but the effort should be there every single night.”"
];

//Elements (Show/Hide)
var noItem = document.getElementById("no-item");
var tdList = document.getElementById("td-list");

window.addEventListener("load", () => {
  var q = randomQuote();
  document.getElementById("quote").innerHTML = q;
  if (todos.length > 0) {
    tdList.style.display = "block";
    noItem.style.display = "none";
    generateList();
  } else {
    tdList.style.display = "none";
    noItem.style.display = "block";
  }
});

function randomQuote(){
    num = Math.floor(Math.random() * quotes.length);
    return quotes[num];
}

function generateList() {
  tdList.innerHTML = "";
  tdList.style.display = "block";
  noItem.style.display = "none";
  todos.forEach((todo) => {
    var li = document.createElement("li");
    li.classList.add(
      "w-full",
      "h-12",
      "text-xl",
      "bg-white",
      "shadow-lg",
      "rounded-md",
      "p-2",
      "my-2"
    );

    var todoName = document.createTextNode(todo.nameTodo);
    li.appendChild(todoName);

    var span = document.createElement("span");
    span.classList.add("float-right", "mr-2");

    var doneButton = document.createElement("button");
    doneButton.classList.add(
      "py-2",
      "px-3",
      "bg-green-500",
      "text-white",
      "rounded-md",
      "text-xs"
    );

    if (todo.done) {
      li.classList.add("line-through");
      doneButton.style.display = "none";
    }

    var doneIcon = document.createElement("i");
    doneIcon.classList.add("fas", "fa-check");

    doneButton.appendChild(doneIcon);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "py-2",
      "px-3",
      "ml-2",
      "bg-red-600",
      "text-white",
      "rounded-md",
      "text-xs"
    );

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash");

    deleteButton.appendChild(deleteIcon);

    span.appendChild(doneButton);
    span.appendChild(deleteButton);

    li.appendChild(span);
    tdList.appendChild(li);

    doneButton.addEventListener("click", (e) => {
      todo.done = true;
      localStorage.setItem("todos", JSON.stringify(todos));
      li.classList.add("line-through");
      doneButton.style.display = "none";
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todos.length > 0) {
        generateList();
      } else {
        noItem.style.display = "block";
        tdList.style.display = "none";
      }
    });
  });
}

addTodo.addEventListener("click", function () {
  var inputTodo = document.getElementById("todo-input").value;
  if (inputTodo.replaceAll(/\s/g, "").length !== 0) {
    document.getElementById("todo-input").classList.add("border-blue-800");
    document.getElementById("todo-input").classList.remove("border-red-600");
    var todo = {
      nameTodo: inputTodo,
      done: false,
    };

    if (todos.push(todo)) {
      localStorage.setItem("todos", JSON.stringify(todos));
      generateList();
      noItem.style.display = "none";
      tdList.style.display = "block";
      document.getElementById("todo-input").value = "";
    }
  } else {
    document.getElementById("todo-input").classList.remove("border-blue-800");
    document.getElementById("todo-input").classList.add("border-red-600");
  }
});
