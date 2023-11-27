let i = 0;
const addBtn = document.getElementsByClassName("addBtn")[0];
const inputField = document.getElementsByClassName("headInput")[0];
const list = document.getElementsByClassName("list")[0];
let length = document.getElementsByClassName("listItem").length;
let parity;
parity = length % 2 === 0;
const completedBtn = document.getElementsByClassName("completedBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const storageValues = [];
for (let i = 0; i < localStorage.length; i++) {
  storageValues.push(localStorage.getItem(localStorage.key(i)));
}
const createListItem = () => {
  try {
    let addItem = document.createElement("li");
    let divadd = document.createElement("div");
    let completing = document.createElement("button");
    let deleting = document.createElement("button");
    completing.classList.add("completedBtn");
    completing.setAttribute("style", "margin-right: 0;");
    completing.innerHTML = "✔";
    completing.addEventListener("click", () => {
      completing.closest("li").style.background = "lightgrey";
      completing.closest("li").style.opacity = "80%";
      completing.closest("li").style.textDecoration = "line-through black";
    });

    deleting.classList.add("deleteBtn");
    deleting.innerHTML = "✖";
    deleting.addEventListener("click", () => {
      deleting.closest("li").remove();
      let arrayRemoveItem = deleting
        .closest("li")
        .textContent.substring(
          0,
          deleting.closest("li").textContent.length - 2,
        );
      let arrayIndexOfRemoveItem = storageValues.indexOf(arrayRemoveItem, 0);
      storageValues.splice(arrayIndexOfRemoveItem, 1);
      localStorage.removeItem(arrayRemoveItem);
      i--;
    });
    divadd.append(completing);
    divadd.append(deleting);

    if (i < localStorage.length) {
      addItem.innerHTML = storageValues[i].toUpperCase();
    } else {
      addItem.innerHTML = inputField.value.toUpperCase();
      localStorage.setItem(
        inputField.value.toUpperCase(),
        inputField.value.toUpperCase(),
      );
      storageValues.push(inputField.value.toUpperCase());
    }
    if (parity === false) {
      addItem.setAttribute("class", "listItem even");
      addItem.append(divadd);
      list.append(addItem);
      parity = !parity;
    } else {
      addItem.setAttribute("class", "listItem odd");
      addItem.append(divadd);
      list.append(addItem);
      parity = !parity;
    }
    i++;
    inputField.value = "";
  } catch (error) {
    console.log(error);
    //localStorage.clear();
  }
};

for (let i = 0; i < localStorage.length; i++) {
  createListItem();
}
addBtn.addEventListener("click", createListItem);
