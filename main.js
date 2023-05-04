let btn = document.querySelector(".forButton");
let inpName = document.querySelector(".input-name");
let inpPhone = document.querySelector(".input-phone");
let inpEmail = document.querySelector(".input-email");
let inpAdress = document.querySelector(".input-adress");
let list = document.querySelector(".contact-list");

btn.addEventListener("click", () => {
  if (
    !inpName.value.trim() &&
    !inpPhone.value.trim() &&
    !inpEmail.value.trim() &&
    !inpAdress.value.trim()
  ) {
    alert(
      "Заполните поля(в случае если нет одного из пунктов: напишите 'none')"
    );
    return;
  }
  let obj = {
    name: inpName.value,
    phone: inpPhone.value,
    email: inpEmail.value,
    adress: inpAdress.value,
  };
  setItemToStorage(obj);
  createElement();
  inpName.value = "";
  inpPhone.value = "";
  inpEmail.value = "";
  inpAdress.value = "";
  console.log(obj);
});

function setItemToStorage(newTask) {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("task-data"));

  data.push(newTask);

  localStorage.setItem("task-data", JSON.stringify(data));
}
createElement();
function createElement() {
  let newData = JSON.parse(localStorage.getItem("task-data"));

  list.innerHTML = "";
  newData.forEach((item, index) => {
    let div = document.createElement("ul");
    div.classList = "list-div";
    let liName = document.createElement("li");
    let liPhone = document.createElement("li");
    let liEmail = document.createElement("li");
    let liAdress = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
    liName.innerText = `name: ${item.name}`;
    liPhone.innerText = `phone:${item.phone}`;
    liEmail.innerText = `email: ${item.email}`;
    liAdress.innerText = `adress: ${item.adress}`;
    btnDelete.innerText = "Delete";

    btnEdit.innerText = "Edit";
    btnDelete.addEventListener("click", () => deleteElement(index));
    btnEdit.addEventListener("click", () => editElement(index));
    div.append(btnDelete);
    div.append(btnEdit);
    div.append(liName);
    div.append(liPhone);
    div.append(liEmail);
    div.append(liAdress);
    list.append(div);
  });
}
function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(index, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  createElement();
}

function editElement(index) {
  let modal = document.querySelector(".modal");
  let name1 = document.querySelector(".modal-name");
  let phone = document.querySelector(".modal-phone");
  let email = document.querySelector(".modal-email");
  let adress = document.querySelector(".modal-adress");

  modal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  name1.value = data[index].name;
  phone.value = data[index].phone;
  email.value = data[index].email;
  adress.value = data[index].adress;
  console.log(data);
  let saveBtn = document.querySelector(".btn-change");
  let closeBtn = document.querySelector(".modal-closer");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  saveBtn.addEventListener("click", () => {
    data[index].name = name1.value;
    data[index].phone = phone.value;
    data[index].email = email.value;
    data[index].adress = adress.value;
    localStorage.setItem("task-data", JSON.stringify(data));
    modal.style.display = "none";
    createElement();
  });
}
