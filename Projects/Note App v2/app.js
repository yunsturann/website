const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.getElementById("close-icon");
const btnAdd = document.getElementById("btn-add");

const titleInput = document.getElementById("title-input");
const descInput = document.getElementById("desc-input");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//getting localstorage notes if exist and parsing them
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  let noteTitle = titleInput.value;
  let noteDesc = descInput.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = dateObj.getMonth(),
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${months[month]} ${day}, ${year}`,
    };
    notes.push(noteInfo);
    //saving notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
  }
});
