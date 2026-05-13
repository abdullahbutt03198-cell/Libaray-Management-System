// Sample Data - Runs only once
if (Books.data.length === 0) {
    Books.data = [
        {id:'1',title:'JavaScript Guide',author:'John Doe',category:'Tech',totalCopies:5,availableCopies:3},
        {id:'2',title:'Clean Code',author:'Robert Martin',category:'Tech',totalCopies:3,availableCopies:2},
        {id:'3',title:'Sapiens',author:'Yuval Harari',category:'Biography',totalCopies:4,availableCopies:1}
    ];
    
    Members.data = [
        {id:'1',name:'Alice Johnson',email:'alice@email.com',phone:'123-456-7890'},
        {id:'2',name:'Bob Smith',email:'bob@email.com',phone:'098-765-4321'}
    ];
    
    App.saveData();
}