class Storage {
    constructor() {
        this.STORAGE_KEY = 'notes';
    }

    // Simulate async operation with Promise
    async getNotes() {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const notes = localStorage.getItem(this.STORAGE_KEY);
                resolve(notes ? JSON.parse(notes) : []);
            }, 1000);
        });
    }

    async saveNotes(notes) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
                resolve();
            }, 1000);
        });
    }
}