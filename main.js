const main = document.querySelector('.main');



let library = [];

function Book() {}

Book.prototype.addBooktoLibrary = function () {
  library.push(this);
};

function newBook(book, author, pages) {
  this.title = book;
  this.author = author;
  this.pages = pages;
}

newBook.prototype = Object.create(Book.prototype);



const harryPotter = new newBook("Harry Potter", 'Jora', 123);
harryPotter.addBooktoLibrary()
const wtf = new newBook('DJO DJO', "nikita", 45)
wtf.addBooktoLibrary()









function displayBooks() {
  for (i = 0; i < library.length; i++) {
    const div = document.createElement('div');
    
    const btn = document.createElement('button');
    div.classList.add('cell');


    const div2 = document.createElement('div')
    div2.classList.add('div2')
    
    const div3 = document.createElement('div')
    div3.classList.add('div3')
    const div4 = document.createElement('div')
    div4.classList.add('div4')
    const readBtn = document.createElement('button')
    readBtn.classList.add('read-btn')
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    readBtn.textContent = "Read"
    editBtn.textContent = "Edit"
    div3.innerHTML = `<img src="images/read.png" /> <p>${library[i].pages}</p>`


    btn.classList.add('cell-btn');
    btn.textContent = "X"
    div.innerHTML = `<h1>${library[i].title}</h1>  by <p>${library[i].author}</p>`
   





    div.appendChild(btn)
    div.appendChild(div2)
    div2.appendChild(div3)
    div2.appendChild(div4)
    div4.appendChild(readBtn)
    div4.appendChild(editBtn)
    div.insertBefore(btn, div.childNodes[0])
    main.appendChild(div);
    main.insertBefore(div, main.childNodes[0]);
 
    
  }

  
}

displayBooks();




//POP UP FORM
const form = document.querySelector('.form-container');



document.addEventListener('click', e=>{
if (e.target.matches('.add-book')) {

    form.setAttribute('style', 'display:flex');

}else if (e.target.matches('.add')){
  



}

});



