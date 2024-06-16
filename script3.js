document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('create').addEventListener('click', showModal);
    document.querySelector('.close').addEventListener('click', hideModal);
    document.getElementById('submitNotes').addEventListener('click', handleNotesSubmit);

    loadNotesFromStorage();
});

function showModal() {
    document.getElementById('modal-content').style.display = 'block';
}

function hideModal() {
    document.getElementById('modal-content').style.display = 'none';
}

function handleNotesSubmit() {
    const notesTitle = document.getElementById('notesTitleInput').value;
    const notesContent = document.getElementById('notesContentInput').value;
    
    if (notesContent !== '' || notesTitle !== '') {
        createNote(notesTitle, notesContent);
        saveNoteToStorage(notesTitle, notesContent);

        document.getElementById('notesTitleInput').value = '';
        document.getElementById('notesContentInput').value = '';
        hideModal();
    } else {
        alert("Note cannot be empty!");
    }
}

function createNote(notesTitle, notesContent) {
    let notesContainer = document.getElementById("notesContainer");
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('notes-container');

    let title = document.createElement('h1');
    title.innerText = notesTitle;
    title.style.color = 'black';

    let content = document.createElement('h2');
    content.innerText = notesContent;
    content.style.color = 'black';
    content.style.fontWeight = 'normal';

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', function() {
        noteDiv.remove();
        removeNoteFromStorage(notesTitle);
    });

    noteDiv.appendChild(title);
    noteDiv.appendChild(content);
    noteDiv.appendChild(deleteButton);
    notesContainer.appendChild(noteDiv);
}

function saveNoteToStorage(title, content) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title: title, content: content });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotesFromStorage() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(function(note) {
        createNote(note.title, note.content);
    });
}

function removeNoteFromStorage(title) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let updatedNotes = notes.filter(function(note) {
        return note.title !== title;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}
