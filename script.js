//Elemanları Seçme

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;


loadItems();
eventListeners();

function eventListeners() {  // Tüm event listenerlar
    form.addEventListener("submit", addNewItem); //submit eventi
    taskList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

function loadItems() {
    todos = getItemsFromlocalStorage();
    todos.forEach(function (item) {  //items elemanlarını dönderme
        creatItem(item);
    })
}

function getItemsFromlocalStorage() {  //Storageden todoları alma

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //array e dönüştürme
    }
    return todos;
}

function setItemTolocalStorage(newTodo) {  //local storage todoları göndrme

    todos = getItemsFromlocalStorage();
    todos.push(newTodo); //yeni eleman push et
    localStorage.setItem("todos", JSON.stringify(todos));

}

function creatItem(newTodo) {
    //li oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times">';

    //Todo Listesine'e List Item'ı ekleme
    li.appendChild(a);
    taskList.appendChild(li);

}

function addNewItem(e) {  //Todo ekleme

    if (input.value === '') { //todo girilmezse eğer uyarı
        alert("Herhangi Bir Todo Girmediniz...");
    }
    else {          //aynı todo girildiğinde dizide var mı kontrol etme
        var dizi = getItemsFromlocalStorage();
        var sonuc = dizi.includes(input.value);
        if (sonuc == false) {
            creatItem(input.value); 
            setItemTolocalStorage(input.value);
        }
        else{
            alert("Aynı Todo'yu Girdiniz, Tekrar Deneyin...");
        }
    }

    // var dizi = getItemsFromlocalStorage();
    // var sonuc = dizi.includes(input.value);

    // if (input.value === '') {
    //     alert("Herhangi Bir Todo Girmediniz...");
    // }
    // else if (sonuc == false) {
    //     creatItem(input.value); //yeni todo oluşturma fonk.
    //     setItemTolocalStorage(input.value);
    // }
    // else{
    //     alert("Aynı girdiniz tekrar deneyin...");
    // }

    input.value = ""; //bir todo girin kısmında todo yazıp enterladıktan sonra  temizleme


    e.preventDefault(); //default olmayı engeller
}

function deleteItem(e) {  //Todo silme

    if (e.target.className === "fas fa-times") {  //icon'a tıkladığında 
        if (confirm("Şu an Todo List'ten birini siliyorsunuz, emin misiniz?")) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }

    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) { // todolaarı storageden silme
    let todos = getItemsFromlocalStorage();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); //splice metodu ile arrayden değeri silebiliriz. o indexten itibaren bir tane obje silinicek demek.  
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos)); //local storageye son halini gönderme
}

function deleteAllItems(e) { //Todo List'in hepsini silme

    if (confirm("Şu an Todo List'in hepsini siliyorsunuz, emin misiniz?")) {
        while (taskList.firstElementChild != null) {
            taskList.removeChild(taskList.firstElementChild);
        }
        localStorage.clear();
    }
}



