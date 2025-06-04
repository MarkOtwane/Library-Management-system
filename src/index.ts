interface Members {
	fullName: string;
	email: string;
	Id_number: string;
	phone: string;
	registrationDate: Date;
}

// DOM ELEMENTS
const fullNameInput = document.getElementById("name") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const IdNumber = document.getElementById("id_number") as HTMLInputElement;
const phone = document.getElementById("phone") as HTMLInputElement;
const registerDate = document.getElementById("registration-date") as HTMLInputElement;
const addMemberButton = document.getElementById("addMember") as HTMLButtonElement;
const table = document.querySelector(".allUsers tbody")!;

// localStorage save member details
let membersArray: Members[] = JSON.parse(localStorage.getItem("membersArray") || "[]");

let indexNo: number | null = null;
// Function add members
const addMember = () => {
	const members: Members = {
		fullName: fullNameInput.value,
		email: email.value,
		Id_number: IdNumber.value,
		phone: phone.value,
		registrationDate: new Date(registerDate.value),
	};
	if (!members.fullName || !members.email || !members.Id_number || !members.phone || !members.registrationDate) {
		alert("Please fill all the required  fields");
		return;
	}

	if (indexNo === null) {
		if (membersArray.some((item) => item.Id_number === members.Id_number || item.email === members.email || item.phone === members.phone)) {
			alert("No duplicate allowed for Id, email and phone number");
			return;
		}
		membersArray.push(members);
	} else {
		//update new entry
		membersArray[indexNo] = members;
		indexNo = null;
		addMemberButton.textContent = "Add";
	}
	//store data in the local storage
	localStorage.setItem("membersArray", JSON.stringify(membersArray));
	//function to display the users entered
	displayAllMember();
};

const displayAllMember = () => {
	table.innerHTML = "";

	membersArray.forEach((item, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<!-- <td>${index + 1}</td> -->
			<td>${item.fullName}</td>
			<td>${item.email}</td>
			<td>${item.Id_number}</td>
			<td>${item.phone}</td>
			<td>${item.registrationDate}</td>
			<td><button class="editButton">Edit</button></td>
			<td><button class="deleteButton" data-index= '${index}'>Delete</button></td>
		`;

		const deleteButton = row.querySelector(".deleteButton") as HTMLButtonElement;
		deleteButton.addEventListener("click", () => {
			deleteTable(index);
		});
		table.appendChild(row);

		// edit button
		const editButton = row.querySelector(".editButton") as HTMLButtonElement;
		editButton.addEventListener("click", () => {
			fullNameInput.value = item.fullName;
			email.value = item.email;
			IdNumber.value = item.Id_number;
			phone.value = item.phone;
			registerDate.value = new Date(item.registrationDate).toString();
			indexNo = index;
			addMemberButton.textContent = "Update";
		});
	});
};

// delete function
const deleteTable = (index: number) => {
	membersArray.splice(index, 1);
	localStorage.setItem("membersArray", JSON.stringify(membersArray)); // update storage
	displayAllMember();
};

interface Books {
	title: string;
	bookIdNumber: string;
	bookAuthor: string;
}

//DOM
const book_title = document.getElementById("bookTitle") as HTMLInputElement;
const book_Id = document.getElementById("book_number") as HTMLInputElement;
const book_author = document.getElementById("author") as HTMLInputElement;
const addBookButton = document.getElementById("addBooks") as HTMLButtonElement;
const booksTable = document.querySelector(".booksTable tbody") as HTMLTableElement;

// save to localStorage
let bookArray: Books[] = JSON.parse(localStorage.getItem("bookArray") || "[]");

let bookIndex: number | null = null;

// function to add books
const addBooks = () => {
	// create object
	const books: Books = {
		title: book_title.value,
		bookIdNumber: book_Id.value,
		bookAuthor: book_author.value,
	};
	if (!books.title || !books.bookIdNumber || !books.bookAuthor) {
		alert("Please fill all the required fields");
		return;
	}
	if (bookIndex === null) {
		if (bookArray.some((item) => item.bookIdNumber === books.bookIdNumber)) {
			alert("No duplicate for book Identification number!");
			return;
		}
		bookArray.push(books);
	} else {
		//update new entry
		bookArray[bookIndex] = books;
		bookIndex = null;
		///////take care here
	}
	//store to local storage
	localStorage.setItem("bookArray", JSON.stringify(bookArray));

	// function to display books available
	displayAvailableBooks();
};

const displayAvailableBooks = () => {
	booksTable.innerHTML = "";
	bookArray.forEach((item, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `

		<td>${item.title}</td>
		<td>${item.bookIdNumber}</td>
		<td>${item.bookAuthor}</td>
		<td><button class="editButtonBtn">Edit</button></td>
		<td><button class="deleteBookBtn" data-index= '${index}'>Delete</button></td>
		`;
		const deleteBookBtn = row.querySelector(".deleteBookBtn") as HTMLButtonElement;
		deleteBookBtn.addEventListener("click", () => {
			deleteBook(index);
		});
		booksTable.appendChild(row);

		// edit button
		const editButton = row.querySelector(".editButtonBtn") as HTMLButtonElement;
		editButton.addEventListener("click", () => {
			book_title.value = item.title;
			book_Id.value = item.bookIdNumber;
			book_author.value = item.bookAuthor;
			bookIndex = index;
			addBookButton.textContent = "Update";
		});
	});
};

//delete book function
const deleteBook = (index: number) => {
	bookArray.splice(index, 1);
	localStorage.setItem("bookArray", JSON.stringify(bookArray));
	displayAvailableBooks();
};

type BorrowedBooksReturn = Members & Books;

let returnBooks: BorrowedBooksReturn[] = JSON.parse(localStorage.getItem("returnBooks") || "[]");
let returnBookIndex: number | null = null;

const borrowBookButton = document.getElementById("borrowBook") as HTMLButtonElement;
const borrowersTable = document.querySelector(".borrow_details tbody");

const borrowBooks = () => {
	const borrowBooksReturn: BorrowedBooksReturn = {
		fullName: fullNameInput.value,
		email: email.value,
		Id_number: IdNumber.value,
		phone: phone.value,
		registrationDate: new Date(registerDate.value),
		title: book_title.value,
		bookIdNumber: book_Id.value,
		bookAuthor: book_author.value,
	};
	if (!borrowBooksReturn) {
		alert("No empty fields allowed");
		return;
	}

	if (returnBookIndex === null) {
		if (returnBooks.some((item) => item.bookIdNumber === borrowBooksReturn.bookIdNumber)) {
			alert("This Book is borrowed by another member");
			return;
		}
		returnBooks.push(borrowBooksReturn);
	} else {
		// update new books
		returnBooks[returnBookIndex] = borrowBooksReturn;
		returnBookIndex = null;
	}
	//store data in the localStorage
	localStorage.setItem("returnBooks", JSON.stringify(returnBooks));

	// function to display borrowers of books
	displayAllBorrowers();
};

const displayAllBorrowers = () => {
	if (borrowersTable) {
		borrowersTable.innerHTML = "";

		returnBooks.forEach((item, index) => {
			const row = document.createElement("tr");
			row.innerHTML = `
			<td>${item.fullName}</td>
			<td>${item.title}</td>
			<td>${item.registrationDate}</td>
			<td><button class="editReturn">Edit</button></td>
			<td><button class="returnButton" data-index= '${index}'>Return Book</button></td>
			`;

			const returnBookButton = row.querySelector(".returnButton") as HTMLButtonElement;
			returnBookButton.addEventListener('click', () => { 
				returnBookFunction(item);
			});
			borrowersTable.appendChild(row);

			//edit button
		});
	}
};

addBookButton.addEventListener("click", addBooks);
displayAvailableBooks();

addMemberButton.addEventListener("click", addMember);
displayAllMember();
