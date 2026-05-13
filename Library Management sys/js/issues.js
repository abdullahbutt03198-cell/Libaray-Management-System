// Issues Module
const Issues = {
    data: [],

    updateDropdowns() {
        let memberSelect = document.getElementById('selectMember');
        memberSelect.innerHTML = '<option value="">Choose Member</option>';
        Members.data.forEach(m => {
            memberSelect.innerHTML += `<option value="${m.id}">${m.name} (${m.id})</option>`;
        });

        let bookSelect = document.getElementById('selectBook');
        bookSelect.innerHTML = '<option value="">Choose Book</option>';
        Books.data.filter(b => b.availableCopies > 0).forEach(b => {
            bookSelect.innerHTML += `<option value="${b.id}">${b.title} (${b.availableCopies} left)</option>`;
        });
    },

    issueBook() {
        let memberId = document.getElementById('selectMember').value;
        let bookId = document.getElementById('selectBook').value;

        if (!memberId || !bookId) {
            App.alert('Please select member and book!', 'error');
            return;
        }

        let book = Books.data.find(b => b.id == bookId);
        if (book.availableCopies == 0) {
            App.alert('Book not available!', 'error');
            return;
        }

        let issueDate = new Date();
        let dueDate = new Date(issueDate.getTime() + 7*24*60*60*1000);

        let issue = {
            id: Issues.getNewId().toString(),
            memberId, bookId,
            issueDate: issueDate.toLocaleDateString(),
            dueDate: dueDate.toLocaleDateString()
        };

        Issues.data.push(issue);
        book.availableCopies--;
        
        App.saveData();
        Issues.updateDropdowns();
        Issues.show();
        App.alert('Book issued successfully!');
    },

    returnBook() {
        let issueId = document.getElementById('returnId').value;
        let issue = Issues.data.find(i => i.id == issueId);
        
        if (!issue) {
            App.alert('Issue ID not found!', 'error');
            return;
        }

        let book = Books.data.find(b => b.id == issue.bookId);
        if (book) book.availableCopies++;

        Issues.data = Issues.data.filter(i => i.id != issueId);
        App.saveData();
        Issues.show();
        Issues.updateDropdowns();
        document.getElementById('returnId').value = '';
        App.alert('Book returned!');
    },

    show() {
        let container = document.getElementById('issuesList');
        container.innerHTML = '';

        Issues.data.forEach(issue => {
            let member = Members.data.find(m => m.id == issue.memberId);
            let book = Books.data.find(b => b.id == issue.bookId);
            let isOverdue = new Date(issue.dueDate) < new Date();

            let div = document.createElement('div');
            div.className = 'issue-item';
            div.innerHTML = `
                <strong>ID: ${issue.id}</strong><br>
                Member: ${member ? member.name : 'N/A'}<br>
                Book: ${book ? book.title : 'N/A'}<br>
                Issued: ${issue.issueDate}<br>
                <span class="due-date ${isOverdue ? 'overdue' : ''}">Due: ${issue.dueDate}</span>
            `;
            container.appendChild(div);
        });
    },

    getNewId() {
        return Issues.data.length ? Math.max(...Issues.data.map(item => parseInt(item.id))) + 1 : 1;
    }
};