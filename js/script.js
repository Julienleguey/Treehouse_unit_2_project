/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// variables declaration to display the students
const itemsPerPage = 10;
const listStudents = document.querySelector('.student-list');
let students = listStudents.children;
const parentDiv = document.querySelector('.page');

// creating the <div> and <ul> to display the pagination links
const divPagination = document.createElement('div');
divPagination.className = 'pagination';
parentDiv.appendChild(divPagination);
const ulPagination = document.createElement('ul');
divPagination.appendChild(ulPagination);

// creating the search bar
const divSearch = document.createElement('div');
divSearch.className = 'student-search';
const divSearchParent = document.querySelector('.page-header.cf');
divSearchParent.appendChild(divSearch);
const searchBar = document.createElement('input');
searchBar.placeholder = 'Search for students...';
searchBar.type = 'text';
divSearch.appendChild(searchBar);
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
divSearch.appendChild(searchButton);

// creating a paragraph to display the error message (in case there are no students found)
const noResult = document.createElement('p');
parentDiv.appendChild(noResult);


// function to call in order to create the pagination links according to the number of students to display
function createPaginationLinks () {
  for (let i = 0; i < students.length/itemsPerPage; i++) {
    const liPagination = document.createElement('li');
    ulPagination.appendChild(liPagination);
    const aPagination = document.createElement('a');
    aPagination.href = '#';
    aPagination.textContent = i+1;
    liPagination.appendChild(aPagination);
  }
}

// function to call to hide or display the students when a pagination link is clicked
function displayItems(from, to) {
    if (from >= itemsPerPage) {
      for (let i = 0; i < from; i++) {
        students[i].style.display = 'none';
      }
    }
    for (let i = from; i <= to; i++) {
      students[i].style.display = 'block';
    }
    if (to < students.length) {
      for (let i = to+1; i <= students.length -1; i++) {
        students[i].style.display = 'none';
    }
  }
}

// function to call in order to display the first page of students
function displayingFirstPage() {
  if (students.length > itemsPerPage) {
    displayItems(0, itemsPerPage-1);
  } else {
    displayItems(0, students.length-1);
  }
}

// function to call in order to delete the previous pagination links (before creating new pagination links when the user does a new search)
function deletePaginationLinks() {
  ulPagination.innerHTML='<ul></ul>';
}

// function to call in order to find the students matching the search input
function searchStudent() {
  // changing the 'students' variable in order to run a search on all the students
  students = listStudents.children;
  // looking for students name or email matching the content of the search bar
  // we use class (displayed, hidden) in order to be able to reunite all of the matching students in the variable 'students' which will be displayed
  const nameSearched = searchBar.value;
  for (let i = 0; i < students.length; i++) {
    const studentName = students[i].querySelector('h3').innerHTML;
    const studentEmail = students[i].querySelector('.email').innerHTML;
    if (studentName.includes(nameSearched) || studentEmail.includes(nameSearched)) {
      students[i].classList.remove('hidden');
      students[i].classList.add('displayed');
      students[i].style.display = 'block';
    } else {
      students[i].classList.remove('displayed');
      students[i].classList.add('hidden');
      students[i].style.display = 'none';
    }
  }
  // reuniting the students matching the search in the variable 'students'
  students = listStudents.querySelectorAll('.displayed');
  // displaying an error message in case of no students matching the search
  if (students.length === 0) {
    noResult.textContent = 'There are no matching students. Please type in another name.'
  } else {
    noResult.textContent ='';
  }
  // deleting the previous pagination links and creating new ones fitting the number of students to display
  deletePaginationLinks();
  createPaginationLinks();
  // displaying the first page of the result
  displayingFirstPage();
}


// displaying the pagination links for the first time
createPaginationLinks();

// displaying the students for the first time
displayingFirstPage();


// event: a click on a pagination link display a different list of students
parentDiv.addEventListener ('click', (e) => {
  const buttonClicked = event.target.textContent;
  const from = itemsPerPage*(buttonClicked-1);
  const to = itemsPerPage*buttonClicked-1;
  const aPagination = document.querySelectorAll('a');
  const ulPagination = aPagination.parentNode;
  if (event.target.tagName === 'A') {
    for (let i = 0; i < students.length/itemsPerPage; i++) {
      aPagination[i].className = '';
    }
    event.target.className = 'active';
    if (to < students.length) {
      displayItems(from, to);
    } else {
      displayItems(from,students.length-1);
    }
  }
});

// event: search matching students when the "search" button is clicked
divSearch.addEventListener('click', (e) => {
  if (event.target.tagName === 'BUTTON') {
    searchStudent();
    searchBar.value = '';
    }
});

// event: search matching students everytime the users changes a character in the search bar
divSearch.addEventListener('keyup', (e) => {
  e.preventDefault();
  searchStudent();
});
