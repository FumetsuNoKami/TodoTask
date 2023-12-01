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
const createCompletedBtn = (flag) => {
  const completing = document.createElement("button");
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
  return completing;
};

const createDeleteBtn = () => {
  const deleting = document.createElement("button");
  deleting.classList.add("deleteBtn");
  deleting.innerHTML = "✖";
  deleting.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    deleting.closest("li").remove();
    let buf = [];
    for (let j = 0; j < storageValues.length; j++) {
      buf.push(storageValues[j].text);
    }
    const liText = deleting
      .closest("li")
      .textContent.substring(0, deleting.closest("li").textContent.length - 2);
    const delIndex = buf.indexOf(liText, 0);
    storageValues.splice(delIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(storageValues));
    i--;
    const items = document.getElementsByClassName("listItem");
    for (let k = delIndex; k < items.length; k++) {
      items[k].classList.remove(k % 2 === 0 ? "odd" : "even");
      items[k].classList.add(k % 2 === 1 ? "odd" : "even");
    }
  });
  return deleting;
};

const addItem = () => {
  const addItem = document.createElement("li");
  const divadd = document.createElement("div");

  if (i < JSON.parse(localStorage.getItem("tasks")).length) {
    addItem.innerHTML = storageValues[i].text;
  } else if (inputField.value.trim() === "") {
    return;
  }
  if (i >= JSON.parse(localStorage.getItem("tasks")).length) {
    storageValues.push({ text: inputField.value, status: "Not completed" });
    addItem.innerHTML = inputField.value;
  }

  divadd.classList.add("divadd");
  divadd.append(createCompletedBtn());
  divadd.append(createDeleteBtn());

  if (storageValues[i].status === "completed")
    addItem.classList.add("completedItem");

  addItem.classList.add("listItem", i % 2 === 0 ? "even" : "odd");
  addItem.append(divadd);
  list.append(addItem);

  i++;
  inputField.value = "";
  localStorage.setItem("tasks", JSON.stringify(storageValues));
};

if (JSON.parse(localStorage.getItem("tasks")) != null)
  for (let i = 0; i < JSON.parse(localStorage.getItem("tasks")).length; i++) {
    addItem();
  }

if (JSON.parse(localStorage.getItem("tasks")) == null) {
  localStorage.setItem("tasks", "[]");
}
addBtn.addEventListener("click", addItem);
