document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    const storage = new Storage();
    const noteManager = new NoteManager(storage);
    const loadingMessage = document.getElementById('loadingMessage');

    // DOM elements
    const notesListElement = document.getElementById('notesList');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    const saveButton = document.getElementById('saveNote');

    // Display loading message
    function showLoading(message) {
        loadingMessage.textContent = message;
    }

    // Clear loading message
    function hideLoading() {
        loadingMessage.textContent = '';
    }

    // Create HTML for a single note
    function createNoteElement(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-card';
        noteDiv.innerHTML = `
            <button class="delete-btn" data-id="${note.id}">Delete</button>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Created: ${note.createdAt}</small>
        `;
        return noteDiv;
    }

    // Display all notes
    function displayNotes(notes) {
        notesListElement.innerHTML = '';
        notes.forEach(note => {
            notesListElement.appendChild(createNoteElement(note));
        });
    }

    // Load and display existing notes
    async function loadAndDisplayNotes() {
        showLoading('Loading notes...');
        try {
            const notes = await noteManager.loadNotes();
            displayNotes(notes);
        } catch (error) {
            console.error('Error loading notes:', error);
        } finally {
            hideLoading();
        }
    }

    // Handle save button click
    saveButton.addEventListener('click', async () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert('Please enter both title and content');
            return;
        }

        showLoading('Saving note...');
        try {
            await noteManager.addNote(title, content);
            titleInput.value = '';
            contentInput.value = '';
            await loadAndDisplayNotes();
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            hideLoading();
        }
    });

    // Handle delete button clicks
    notesListElement.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const noteId = parseInt(e.target.dataset.id);
            showLoading('Deleting note...');
            try {
                await noteManager.deleteNote(noteId);
                await loadAndDisplayNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
            } finally {
                hideLoading();
            }
        }
    });

    // Initial load
    loadAndDisplayNotes();
});