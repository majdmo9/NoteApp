const postBtn = document.querySelector(".post-form");
const deleteBtn = document.querySelector(".delete-form");
const deletedResult = document.getElementById("note-deleted");
const updatedResult = document.getElementById("note-updated");
const updateBtn = document.querySelector(".update-form");
const getBtn = document.querySelector(".get-form");
const result = document.querySelector(".database");
//listener do the post action when clicking the submit button
postBtn.addEventListener("submit", async (e, post) => {
  e.preventDefault(); //to refresh
  let noteTitle = e.target.titleInput.value;
  let noteContent = e.target.contentInput.value;
  post = {
    noteTitle: noteTitle,
    noteContent: noteContent,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(post),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };
  let response = await fetch("/notes", options);
  let json = await response.json();
  console.log(json);
});
//Listener do the delete action when clicking the delete button
deleteBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  let noteId = e.target.idInput.value;
  const options = {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      noteId: noteId,
    }),
  };
  const URL = `/notes/${noteId}`;
  let response = await fetch(URL, options);
  let json = await response.json();
  console.log("note deleted: ", json);
  showDeletedNote(json);
});

function showDeletedNote(json) {
  deletedResult.innerHTML = `<h4>Note Title : </h4>
  ${json.noteTitle}<br/><h4>Note Content : ${json.noteContent}</h4>`;
}

//Listener do the update action when clicking on update button
updateBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  let noteId = e.target.idInput.value;
  let noteTitle = e.target.titleInput.value;
  let noteContent = e.target.contentInput.value;
  update = {
    noteTitle: noteTitle,
    noteContent: noteContent,
  };
  const options = {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(update),
  };
  const URL = `/notes/${noteId}`;
  let response = await fetch(URL, options);
  let json = await response.json();
  console.log("movie to update : ", json);
  showUpdatedNote(json);
});

function showUpdatedNote(json) {
  updatedResult.innerHTML = `<h4>Note Title : </h4>
    ${json.noteTitle}<br/><h4>Note Content : ${json.noteContent}</h4>`;
  if (json.message != null)
    updatedResult.innerHTML += `<br/><p>${json.message}</p>`;
}
//Listener do the get action when clicking on get button
getBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  let noteId = e.target.idInput.value;
  const URL = `/notes/${noteId}`;
  let response = await fetch(URL);
  let json = await response.json();
  result.innerHTML = "";
  //if user did not enter any id
  if (!noteId) {
    for (let i = 0; i < json.length; i++) {
      result.innerHTML += `Title : ${json[i].noteTitle}<br/>`;
    }
  } else {
    if (json.message != null) result.innerHTML = `<br/><p>${json.message}</p>`;
    else result.innerHTML += `Title : ${json.noteTitle}<br/>`;
  }
});
