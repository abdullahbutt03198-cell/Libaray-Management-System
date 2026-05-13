// Main App Controller
const App = {
    init() {
        App.loadData();
        App.updateDashboard();
        Books.show();
        Members.show();
        Issues.updateDropdowns();
        Issues.show();
    },

    showPage(page) {
        // Hide all sections
        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        // Show selected page
        document.getElementById(page).classList.remove('hidden');
        event.target.classList.add('active');
        
        // Update data
        if (page === 'dashboard') App.updateDashboard();
        if (page === 'books') Books.show();
        if (page === 'members') Members.show();
        if (page === 'issue') {
            Issues.updateDropdowns();
            Issues.show();
        }
    },

    updateDashboard() {
        let totalBooks = Books.data.length;
        let available = Books.data.reduce((sum, b) => sum + b.availableCopies, 0);
        let issued = Issues.data.length;
        let totalMembers = Members.data.length;

        document.getElementById('totalBooks').textContent = totalBooks;
        document.getElementById('availableBooks').textContent = available;
        document.getElementById('issuedBooks').textContent = issued;
        document.getElementById('totalMembers').textContent = totalMembers;
    },

    loadData() {
        Books.data = JSON.parse(localStorage.getItem('books')) || [];
        Members.data = JSON.parse(localStorage.getItem('members')) || [];
        Issues.data = JSON.parse(localStorage.getItem('issues')) || [];
    },

    saveData() {
        localStorage.setItem('books', JSON.stringify(Books.data));
        localStorage.setItem('members', JSON.stringify(Members.data));
        localStorage.setItem('issues', JSON.stringify(Issues.data));
        App.updateDashboard();
    },

    alert(msg, type = 'success') {
        let alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = msg;
        document.querySelector('.main').insertBefore(alert, document.querySelector('.main').firstChild);
        setTimeout(() => alert.remove(), 3000);
    }
};

// Start App
window.onload = App.init;