class NoteManager {
    constructor(storage) {
        this.storage = storage;
        this.notes = [];
    }

    async loadNotes() {
        this.notes = await this.storage.getNotes();
        return this.notes;
    }

    async addNote(title, content) {
        const newNote = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toLocaleDateString()
        };

        this.notes.push(newNote);
        await this.storage.saveNotes(this.notes);
        return newNote;
    }

    async deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        await this.storage.saveNotes(this.notes);
    }
}