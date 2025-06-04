interface Members {
	fullName: string;
	email: string;
	Id_number: string;
	phone: string;
	registrationDate: Date;
}

interface Books {
	title: string;
	bookIdNumber: string;
	bookAuthor: string;
}

type BorrowedBooksReturn = {
	Id_number: string;
	bookIdNumber: string;
	registrationDate: Date;
};

const fullNameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const IdNumber = document.getElementById("id_number") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const registerDate = document.getElementById("registration-date") as HTMLInputElement;
const addMemberButton = document.getElementById("addMember") as HTMLButtonElement;
const memberTable = document.querySelector(".allUsers tbody")!;

let membersArray: Members[] = JSON.parse(localStorage.getItem("membersArray") || "[]");
let indexNo: number | null = null;

// Add Member
const addMember = () => {
	const members: Members = {
		fullName: fullNameInput.value,
		email: emailInput.value,
		Id_number: IdNumber.value,
		phone: phoneInput.value,
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
		membersArray[indexNo] = members;
		indexNo = null;
		addMemberButton.textContent = "Add";
	}
	localStorage.setItem("membersArray", JSON.stringify(membersArray));
	displayAllMember();
};

const displayAllMember = () => {
	memberTable.innerHTML = "";
	membersArray.forEach((item, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${item.fullName}</td>
			<td>${item.email}</td>
			<td>${item.Id_number}</td>
			<td>${item.phone}</td>
			<td>${new Date(item.registrationDate).toLocaleDateString("en-GB")}</td>
			<td><button class="editButton">Edit</button></td>
			<td><button class="deleteButton" data-index= '${index}'>Delete</button></td>
		`;
		const deleteButton = row.querySelector(".deleteButton") as HTMLButtonElement;
		deleteButton.addEventListener("click", () => deleteTable(index));

		const editButton = row.querySelector(".editButton") as HTMLButtonElement;
		editButton.addEventListener("click", () => {
			fullNameInput.value = item.fullName;
			emailInput.value = item.email;
			IdNumber.value = item.Id_number;
			phoneInput.value = item.phone;
			registerDate.value = new Date(item.registrationDate).toISOString().split("T")[0];
			indexNo = index;
			addMemberButton.textContent = "Update";
		});

		memberTable.appendChild(row);
	});
};

const deleteTable = (index: number) => {
	membersArray.splice(index, 1);
	localStorage.setItem("membersArray", JSON.stringify(membersArray));
	displayAllMember();
};

// Book  domm
const book_title = document.getElementById("bookTitle") as HTMLInputElement;
const book_Id = document.getElementById("book_number") as HTMLInputElement;
const book_author = document.getElementById("author") as HTMLInputElement;
const addBookButton = document.getElementById("addBooks") as HTMLButtonElement;
const booksTable = document.querySelector(".booksTable tbody") as HTMLTableElement;

let bookArray: Books[] = JSON.parse(localStorage.getItem("bookArray") || "[]");
let bookIndex: number | null = null;

const addBooks = () => {
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
		bookArray[bookIndex] = books;
		bookIndex = null;
		addBookButton.textContent = "Add Book";
	}
	localStorage.setItem("bookArray", JSON.stringify(bookArray));
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
		deleteBookBtn.addEventListener("click", () => deleteBook(index));

		const editButton = row.querySelector(".editButtonBtn") as HTMLButtonElement;
		editButton.addEventListener("click", () => {
			book_title.value = item.title;
			book_Id.value = item.bookIdNumber;
			book_author.value = item.bookAuthor;
			bookIndex = index;
			addBookButton.textContent = "Update";
		});

		booksTable.appendChild(row);
	});
};

const deleteBook = (index: number) => {
	bookArray.splice(index, 1);
	localStorage.setItem("bookArray", JSON.stringify(bookArray));
	displayAvailableBooks();
};

// Borrow Logic
let returnBooks: BorrowedBooksReturn[] = JSON.parse(localStorage.getItem("returnBooks") || "[]");
let returnBookIndex: number | null = null;

const borrowBookButton = document.getElementById("borrowBook") as HTMLButtonElement;
const borrowersTable = document.querySelector(".borrow_details tbody")!;
const borrowerIdInput = document.getElementById("borrower_id_number") as HTMLInputElement;
const borrowBookIdInput = document.getElementById("borrow_book_number") as HTMLInputElement;
const borrowDateInput = document.getElementById("borrow_date") as HTMLInputElement;

const borrowBooks = () => {
	const Id_number = borrowerIdInput.value;
	const bookIdNumber = borrowBookIdInput.value;
	const registrationDate = new Date(borrowDateInput.value);

	if (!Id_number || !bookIdNumber || !borrowDateInput.value) {
		alert("All borrow fields must be filled.");
		return;
	}

	const newBorrow: BorrowedBooksReturn = {
		Id_number,
		bookIdNumber,
		registrationDate,
	};

	if (returnBookIndex === null) {
		if (returnBooks.some((item) => item.bookIdNumber === newBorrow.bookIdNumber)) {
			alert("This book is already borrowed.");
			return;
		}
		returnBooks.push(newBorrow);
	} else {
		returnBooks[returnBookIndex] = newBorrow;
		returnBookIndex = null;
		borrowBookButton.textContent = "Borrow the Book";
	}

	localStorage.setItem("returnBooks", JSON.stringify(returnBooks));
	displayAllBorrowers();
};

const displayAllBorrowers = () => {
	membersArray = JSON.parse(localStorage.getItem("membersArray") || "[]");
	bookArray = JSON.parse(localStorage.getItem("bookArray") || "[]");
	returnBooks = JSON.parse(localStorage.getItem("returnBooks") || "[]");

	borrowersTable.innerHTML = "";
	returnBooks.forEach((item, index) => {
		const member = membersArray.find((m) => m.Id_number === item.Id_number);
		const realName = member ? member.fullName : "Unknown Member";
		const book = bookArray.find((b) => b.bookIdNumber === item.bookIdNumber);
		const realTitle = book ? book.title : "Unknown Book";
		const borrowDate = new Date(item.registrationDate).toLocaleDateString("en-GB");

		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${realName}</td>
			<td>${realTitle}</td>
			<td>${borrowDate}</td>
			<td><button class="editReturn">Edit</button></td>
			<td><button class="returnButton" data-index= '${index}'>Return Book</button></td>
		`;

		const returnButton = row.querySelector(".returnButton") as HTMLButtonElement;
		returnButton.addEventListener("click", () => returnBookFunction(index));

		const editButton = row.querySelector(".editReturn") as HTMLButtonElement;
		editButton.addEventListener("click", () => {
			borrowerIdInput.value = item.Id_number;
			borrowBookIdInput.value = item.bookIdNumber;
			borrowDateInput.value = new Date(item.registrationDate).toISOString().split("T")[0];
			returnBookIndex = index;
			borrowBookButton.textContent = "Update Borrow";
		});

		borrowersTable.appendChild(row);
	});
};

const returnBookFunction = (index: number) => {
	returnBooks.splice(index, 1);
	localStorage.setItem("returnBooks", JSON.stringify(returnBooks));
	displayAllBorrowers();
};

// Init
document.addEventListener("DOMContentLoaded", () => {
	addBookButton.addEventListener("click", addBooks);
	addMemberButton.addEventListener("click", addMember);
	borrowBookButton.addEventListener("click", borrowBooks);

	displayAvailableBooks();
	displayAllMember();
	displayAllBorrowers();
});
