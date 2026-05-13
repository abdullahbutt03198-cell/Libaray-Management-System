// Books Module
const Books = {
    data: [],

    save() {
        let title = document.getElementById('bookTitle').value;
        let author = document.getElementById('bookAuthor').value;
        let category = document.getElementById('bookCategory').value;
        let total = parseInt(document.getElementById('totalCopies').value);
        let available = parseInt(document.getElementById('availableCopies').value);

        if (!title || !author || !category || !total || total < available || available < 0) {
            App.alert('Please fill all fields correctly!', 'error');
            return;
        }

        if (Books.editId) {
            // Update
            let book = Books.data.find(b => b.id == Books.editId);
            book.title = title;
            book.author = author;
            book.category = category;
            book.totalCopies = total;
            book.availableCopies = available;
            App.alert('Book updated!');
            Books.editId = null;
        } else {
            // Add new
            let book = {
                id: Books.getNewId().toString(),
                title, author, category,
                totalCopies: total,
                availableCopies: available
            };
            Books.data.push(book);
            App.alert('Book added!');
        }

        App.saveData();
        Books.clearForm();
        Books.show();
    },

    edit(id) {
        let book = Books.data.find(b => b.id == id);
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookCategory').value = book.category;
        document.getElementById('totalCopies').value = book.totalCopies;
        document.getElementById('availableCopies').value = book.availableCopies;
        Books.editId = id;
    },

    delete(id) {
        if (confirm('Delete this book?')) {
            Books.data = Books.data.filter(b => b.id != id);
            App.saveData();
            Books.show();
            App.alert('Book deleted!');
        }
    },

    clearForm() {
        document.getElementById('bookId').value = '';
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookCategory').value = '';
        document.getElementById('totalCopies').value = '';
        document.getElementById('availableCopies').value = '';
        Books.editId = null;
    },

    show() {
        let search = document.getElementById('searchBook').value.toLowerCase();
        let cat = document.getElementById('filterCat').value;
        
        let filtered = Books.data.filter(book => 
            (!search || book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)) &&
            (!cat || book.category == cat)
        );

        let tbody = document.querySelector('#booksTable tbody');
        tbody.innerHTML = '';

        filtered.forEach(book => {
            let row = tbody.insertRow();
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.totalCopies}</td>
                <td>${book.availableCopies}</td>
                <td>
                    <button class="btn btn-primary" onclick="Books.edit('${book.id}')" style="padding:0.5rem;font-size:0.8rem">Edit</button>
                    <button class="btn btn-danger" onclick="Books.delete('${book.id}')" style="padding:0.5rem;font-size:0.8rem">Delete</button>
                </td>
            `;
        });
    },

    getNewId() {
        return Books.data.length ? Math.max(...Books.data.map(item => parseInt(item.id))) + 1 : 1;
    },

    editId: null
};