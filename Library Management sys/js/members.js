// Members Module
const Members = {
    data: [],

    save() {
        let name = document.getElementById('memberName').value;
        let email = document.getElementById('memberEmail').value;
        let phone = document.getElementById('memberPhone').value;

        if (!name || !email || !phone) {
            App.alert('Please fill all fields!', 'error');
            return;
        }

        if (Members.editId) {
            let member = Members.data.find(m => m.id == Members.editId);
            member.name = name;
            member.email = email;
            member.phone = phone;
            App.alert('Member updated!');
            Members.editId = null;
        } else {
            let member = {
                id: Members.getNewId().toString(),
                name, email, phone
            };
            Members.data.push(member);
            App.alert('Member added!');
        }

        App.saveData();
        Members.clearForm();
        Members.show();
    },

    edit(id) {
        let member = Members.data.find(m => m.id == id);
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone;
        Members.editId = id;
    },

    delete(id) {
        if (Issues.data.some(i => i.memberId == id)) {
            App.alert('Cannot delete member with issued books!', 'error');
            return;
        }
        if (confirm('Delete this member?')) {
            Members.data = Members.data.filter(m => m.id != id);
            App.saveData();
            Members.show();
            App.alert('Member deleted!');
        }
    },

    clearForm() {
        document.getElementById('memberId').value = '';
        document.getElementById('memberName').value = '';
        document.getElementById('memberEmail').value = '';
        document.getElementById('memberPhone').value = '';
        Members.editId = null;
    },

    show() {
        let tbody = document.querySelector('#membersTable tbody');
        tbody.innerHTML = '';

        Members.data.forEach(member => {
            let row = tbody.insertRow();
            row.innerHTML = `
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>
                    <button class="btn btn-primary" onclick="Members.edit('${member.id}')" style="padding:0.5rem;font-size:0.8rem">Edit</button>
                    <button class="btn btn-danger" onclick="Members.delete('${member.id}')" style="padding:0.5rem;font-size:0.8rem">Delete</button>
                </td>
            `;
        });
    },

    getNewId() {
        return Members.data.length ? Math.max(...Members.data.map(item => parseInt(item.id))) + 1 : 1;
    },

    editId: null
};