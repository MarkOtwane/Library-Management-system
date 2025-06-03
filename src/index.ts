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
let membersArray: Members[] = JSON.parse(localStorage.getItem("memberArray") || "[]");

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
	localStorage.setItem("memberArrays", JSON.stringify(membersArray));
	//function to display the users entered
	displayAllMember();
};

const displayAllMember = () => {
	table.innerHTML = "";

	membersArray.forEach((item, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${index + 1}</td>
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
			registerDate.value = new Date(item.registrationDate).toISOString().split("T")[0];
			indexNo = index;
			addMemberButton.textContent = "Update";
		});
	});
};

// delete function
const deleteTable = (index: number) => {
	membersArray.splice(index, 1);
	localStorage.setItem("memberArrays", JSON.stringify(membersArray)); // update storage
	displayAllMember();
};

addMemberButton.addEventListener("click", addMember);
displayAllMember(); 
