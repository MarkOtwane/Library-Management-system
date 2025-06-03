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
	if ((members.fullName || members.email || members.Id_number || members.phone || members.registrationDate) === "") {
		alert("Please fill all the required  fields");
		return;
	}
};

addMemberButton.addEventListener("click", addMember);
