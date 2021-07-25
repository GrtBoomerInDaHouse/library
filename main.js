const main = document.querySelector(".main");
const addBookBtn = document.querySelector('button')

addBookBtn.parentElement.setAttribute('style', 'border-color:transparent')


let library = [];

function Book() {}

Book.prototype.addBooktoLibrary = function () {
  library.push(this);
};

function nextBook(book, author, pages) {
  this.title = book;
  this.author = author;
  this.pages = pages;
}

nextBook.prototype = Object.create(Book.prototype);



//-----------------------POP-UP FORM----------------------



const form = document.querySelector(".form-container");

const input1 = document.getElementById("1");
const input2 = document.getElementById("2");
const input3 = document.getElementById("3");

document.addEventListener("click", (e) => {
  if (e.target.matches('.plus')) {
    form.setAttribute("style", "display:flex");
  } else if (e.target.matches(".add")) {
    let book;

    makeBook(book, input1.value, input2.value, input3.value);
   
   

    removeCells();
    displayBooks();

    form.setAttribute("style", "display:none");
    input1.value = "";
    input2.value = "";
    input3.value = "";
  } else if (e.target.matches(".cancel")) {
    form.setAttribute("style", "display:none");
    return;
  }
});





// ----TITLE INPUT----

input1.addEventListener("keypress", (e) => {
  labels = document.querySelectorAll("label");
  if (input1.value.length > 20) {
    e.preventDefault();
    input1.classList.add("wrong");

    labels[0].setAttribute("style", "display:flex");
    
  } else {
    input1.classList.remove("wrong");
    labels[0].removeAttribute("style");
    
  }
});

// AUTHOR INPUT

input2.addEventListener("keypress", (e) => {
  let allowedKeys = "1234567890";
  labels = document.querySelectorAll("label");
  if (allowedKeys.indexOf(e.key) !== -1 || input2.value.length > 34) {
    e.preventDefault();

    input2.classList.add("wrong");

    labels[1].setAttribute("style", "display:flex");
  } else {
    input1.classList.remove('wrong');
    labels[1].removeAttribute('style', 'display:flex');
  }
});

// PAGES INPUT

input3.addEventListener("keypress", (e) => {
  let allowedKeys = "1234567890";

  if (allowedKeys.indexOf(e.key) === -1) {
    e.preventDefault();

    input3.classList.add("wrong");

    labels = document.querySelectorAll("label");

    labels[2].setAttribute("style", "display:flex");
  } else if (input3.value.length > 2) {
    input3.classList.add("wrong");
    input3.value = "";

    labels[2].setAttribute("style", "display:flex");
  } else {
    input3.classList.remove("wrong");
    labels[2].removeAttribute("style");
  }
});







document.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    let index = e.target.parentElement.getAttribute("data");

    main.removeChild(e.target.parentElement);

    let cellsNode = main.querySelectorAll(".cell");

    cellsNode.forEach((elem) => {
      index = elem.attributes["data"];

      if (index === 0 || index === undefined) {
        return;
      } else {
        index.value--;
      }
    });

    library.splice(index, 1);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".read-btn")) {
   let ancestor = e.target.closest('.cell');
   let img = ancestor.querySelector('img');
  
   
    e.target.classList.toggle("red");
    img.classList.toggle('noread');
  }
});

document.addEventListener("click", (e) => {
 
  if (e.target.matches(".page-plus-btn")) {
    
    let ancestor = e.target.closest(".cell");
    let pNodes = ancestor.querySelectorAll('p');
    let p = pNodes[1];     
    let index = ancestor.attributes["data"].value;
    pages = library[index]["pages"];

    p.textContent = Number(p.textContent) + 1;
    pages = toString(p.textContent);
    
    let changedObj = new nextBook(
      `${library[index]["title"]}`,
      `${library[index]["author"]}`,
      `${p.textContent}`
    );

    
    library.splice(index, 1, changedObj);
  }
});







// ----------CREATE REMOVE DISPLAY BLOCK ----------

function displayBooks() {
  library.map((item, index) => {
    createCells(item, index);
  });
}


function removeCells() {
  for (i = 0; i <= library.length; i++) 
  
  {
    if (main.children[0].matches(".add-book-div")) {
      continue;
    } else {
      main.children[0].remove();
    }
  }
}


function makeBook(name, title, author, pages){

  if (pages === ""){
    name = new nextBook(title, author, 0)
  } else{
    name = new nextBook(title, author, pages)
  }
  name.addBooktoLibrary()
}



function createCells(item, index) {
  const cell = document.createElement("div");
  const cellInner = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const image = document.createElement("div");
  const bottomDiv = document.createElement("div");
  const readBtn = document.createElement("button");
  const pageBtn = document.createElement("button");

  cell.classList.add("cell");
  cell.setAttribute("data", `${index}`);
  cellInner.classList.add("div2");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";
  image.classList.add("div-image");
  bottomDiv.classList.add("div4");
  readBtn.classList.add("read-btn");
  readBtn.classList.add('red');
  pageBtn.classList.add("page-plus-btn");

  cell.innerHTML = `<h1>${item.title}</h1>  by <p>${item.author}</p>`;
  image.innerHTML = `<img src="images/read.png" /> <p>${item.pages}</p>`;
  readBtn.textContent = "Read";
  pageBtn.textContent = "Page++";

  main.appendChild(cell);
  main.insertBefore(cell, main.childNodes[0]);

  cell.appendChild(cellInner);
  cell.appendChild(deleteBtn);
  cell.insertBefore(deleteBtn, cell.childNodes[0]);

  cellInner.appendChild(image);
  cellInner.appendChild(bottomDiv);
  bottomDiv.appendChild(readBtn);
  bottomDiv.appendChild(pageBtn);
}
