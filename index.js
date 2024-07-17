document.addEventListener('DOMContentLoaded', function () {
  const notesGrid = document.getElementById('notesGrid');
  const addNoteButton = document.querySelector('add-note-button');
  const noteTitleInput = document.querySelector('note-title-input');
  const noteBodyTextarea = document.querySelector('note-body-textarea');

  const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';
  
  async function fetchNotes() {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      const result = await response.json();
      notesData = result.data;
      renderNotes();
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function addNote() {
    const title = noteTitleInput.shadowRoot.querySelector('input').value;
    const body = noteBodyTextarea.shadowRoot.querySelector('textarea').value;

    if (title.length >= 3 && body.length >= 5) {
      try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, body })
        });
        const result = await response.json();
        notesData.push(result.data);
        renderNotes();
        noteTitleInput.shadowRoot.querySelector('input').value = '';
        noteBodyTextarea.shadowRoot.querySelector('textarea').value = '';
      } catch (error) {
        console.error('Error adding note:', error);
      }
    } else {
      if (title.length < 3) {
        noteTitleInput.shadowRoot.querySelector('input').reportValidity();
      }
      if (body.length < 5) {
        noteBodyTextarea.shadowRoot.querySelector('textarea').reportValidity();
      }
    }
  }

  async function deleteNote(noteId) {
    try {
      await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'DELETE'
      });
      notesData = notesData.filter(note => note.id !== noteId);
      renderNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  function renderNotes() {
    notesGrid.innerHTML = '';
    notesData.forEach(note => {
      const noteItem = document.createElement('div');
      noteItem.classList.add('note-item');
      noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button class="delete-note-button" data-id="${note.id}">Hapus</button>
      `;
      noteItem.querySelector('.delete-note-button').addEventListener('click', function () {
        const noteId = this.getAttribute('data-id');
        deleteNote(noteId);
      });
      notesGrid.appendChild(noteItem);
    });
  }

  addNoteButton.addEventListener('addNote', addNote);
  fetchNotes();
});
