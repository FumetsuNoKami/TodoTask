let i = 0;
const inputField = document.getElementsByClassName("headInput")[0];
const addBtn = document.getElementsByClassName("addBtn")[0];
const list = document.getElementsByClassName("list")[0];
const completedBtn = document.getElementsByClassName("completedBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const storageValues = [];

if (JSON.parse(localStorage.getItem("tasks")) != null)
  for (let i = 0; i < JSON.parse(localStorage.getItem("tasks")).length; i++) {
    storageValues.push({
      text: JSON.parse(localStorage.getItem("tasks"))[i].text,
      status: JSON.parse(localStorage.getItem("tasks"))[i].status,
    });
  }
const createListItem = () => {
  const addItem = document.createElement("li");
  const divadd = document.createElement("div");
  const completing = document.createElement("button");
  const deleting = document.createElement("button");

  completing.classList.add("completedBtn");
  completing.setAttribute("style", "margin-right: 0;");
  completing.innerHTML = "✔";
  completing.addEventListener("click", () => {
    const liText = completing
      .closest("li")
      .textContent.substring(
        0,
        completing.closest("li").textContent.length - 2,
      );
    let buf = [];
    for (let j = 0; j < storageValues.length; j++) {
      buf.push(storageValues[j].text);
    }

    const completeIndex = buf.indexOf(liText, 0);
    if (completing.closest("li").classList.contains("completedItem")) {
      storageValues[completeIndex].status = "Not completed";
      completing.closest("li").classList.remove("completedItem");
    } else {
      storageValues[completeIndex].status = "completed";
      completing.closest("li").classList.add("completedItem");
    }
    localStorage.setItem("tasks", JSON.stringify(storageValues));
  });

  deleting.classList.add("deleteBtn");
  deleting.innerHTML = "✖";
  deleting.addEventListener("click", () => {
    deleting.closest("li").remove();
    let buf = [];
    for (let j = 0; j < storageValues.length; j++) {
      buf.push(storageValues[j].text);
    }
    const liText = deleting
      .closest("li")
      .textContent.substring(0, deleting.closest("li").textContent.length - 2);
    const completeIndex = buf.indexOf(liText, 0);
    storageValues.splice(completeIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(storageValues));
    i--;
  });

  divadd.classList.add("divadd");
  divadd.append(completing);
  divadd.append(deleting);

  if (i < JSON.parse(localStorage.getItem("tasks")).length) {
    addItem.innerHTML = storageValues[i].text;
  } else if (inputField.value.trim() === "") {
    return;
  }
  if (i >= JSON.parse(localStorage.getItem("tasks")).length) {
    storageValues.push({ text: inputField.value, status: "Not completed" });
    addItem.innerHTML = inputField.value;
  }

  addItem.classList.add("listItem", i % 2 === 0 ? "even" : "odd");
  addItem.append(divadd);
  list.append(addItem);

  if (storageValues[i].status === "completed")
    completing.closest("li").classList.add("completedItem");

  i++;
  inputField.value = "";
  localStorage.setItem("tasks", JSON.stringify(storageValues));
};

if (JSON.parse(localStorage.getItem("tasks")) != null)
  for (let i = 0; i < JSON.parse(localStorage.getItem("tasks")).length; i++) {
    createListItem();
  }

if (JSON.parse(localStorage.getItem("tasks")) == null) {
  localStorage.setItem("tasks", "[]");
}
addBtn.addEventListener("click", createListItem);
