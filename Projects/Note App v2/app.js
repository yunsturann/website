const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
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
let isUpDate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleInput.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  btnAdd.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = ` <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="deleteNote(${index})"><i  class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    //removing show class from the settings menu on document click
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(index) {
  if (!confirm("Are you sure to delete the note ?")) return;
  notes.splice(index, 1);
  //saving notes to localstorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(index, title, desc) {
  addBox.click();
  isUpDate = true;
  updateId = index;
  titleInput.value = title;
  descInput.value = desc;
  btnAdd.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
}

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  let noteTitle = titleInput.value;
  let noteDesc = descInput.value;
  titleInput.value = "";
  descInput.value = "";

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

    if (!isUpDate) {
      notes.push(noteInfo);
    } else {
      isUpDate = false;
      notes[updateId] = noteInfo;
    }

    //saving notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
