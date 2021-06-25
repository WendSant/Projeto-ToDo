// Pegando os elementos
let inputAddTask = document.querySelector("#inputTodo");
let listTask = document.querySelector("#todoList");
let btnAddTask = document.querySelector("#btnaddTask");
let btnAddTask2 = document.querySelector("#btnaddTask2");
let clearAllTask = document.getElementById("#btnclearAllTask");
let clearAllTask2 = document.getElementById("#btnclearAllTask2");
showTasks();

// gambiarra
inputAddTask.addEventListener("keyup", function (e) {
  var key = e.which || e.keyCode;
  if (key == 14 && inputAddTask.value.length > 2) {
    // recebendo o valor digitando no input
    let valueOfInput = inputAddTask.value; 
    let getLocalStorage = localStorage.getItem("Tasks"); // localstorage

    // verificar se existem dados no localstorage, se não, criar o array para armazenar
    if (getLocalStorage == null) {
      // verificando se o localstorage esta vazio
      tasks = [];
    } else {
      // transformando a string em objeto
      tasks = JSON.parse(getLocalStorage); 
    }
    // pega os dados do input e adicona no array
    tasks.push(valueOfInput);
     // Salvando no localstorage convertido em string
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    // função pra atualizar o html
    showTasks();
  }
});

// Acontecendo a mesma coisa basicamente só que para o botão pegando o valor do input
// 2 botões com as mesmas funções 1 para desktop e outro para o mobile
btnAddTask2.onclick = () => {
  if (inputAddTask.value.length > 2) {
    let valueOfInput = inputAddTask.value;
    let getLocalStorage = localStorage.getItem("Tasks");

    if (getLocalStorage == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(getLocalStorage);
    }

    tasks.push(valueOfInput);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    showTasks();
  } else {
    alert("Digite alguma tarefa");
  }
};

btnAddTask.onclick = () => {
  if (inputAddTask.value.length > 2) {
    let valueOfInput = inputAddTask.value; // recebendo o valor digitando no input
    let getLocalStorage = localStorage.getItem("Tasks");
    if (getLocalStorage == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(getLocalStorage); 
    }
    tasks.push(valueOfInput);
    localStorage.setItem("Tasks", JSON.stringify(tasks)); 
    showTasks();
  } else {
    alert("Digite alguma tarefa");
  }
};

// Função para manter o html atualizado
function showTasks() {
  let getLocalStorage = localStorage.getItem("Tasks");
  if (getLocalStorage == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(getLocalStorage);
  }

  let newLi = "";
  // adicionar todos os elementos do array na li
  // Famosa copiada, não faço ideia ainda do que ta acontecendo nessa linha abaixo
  tasks.forEach((element, index) => {
    newLi += `<li> ${element} <span onclick="removeTask(${index})"><i class="fas fa-minus pos"></i></span></li>`;
  });

  listTask.innerHTML = newLi;
  inputAddTask.value = "";
}

function removeTask(index) {
  // Recebendo local storage
  let getLocalStorage = localStorage.getItem("Tasks"); 
  // JSON.parse analisa uma string e retorna um objeto JS
  tasks = JSON.parse(getLocalStorage); 
  // O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos
  tasks.splice(index, 1); 
  // Converte objeto javascript para objeto JSON
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  // Chamando função showTasks()
  showTasks(); 
}

// Botão para remover todas as tarefas, fiz 2 versões 1 para desktop e outra para mobile
btnclearAllTask.onclick = () => {
  // Array vazio
  tasks = []; 
  // Converte objeto javascript para objeto JSON
  localStorage.setItem("Tasks", JSON.stringify(tasks)); 
  showTasks(); 
};

btnclearAllTask2.onclick = () => {
  tasks = [];
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  showTasks();
};
