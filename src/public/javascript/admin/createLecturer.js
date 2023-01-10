const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailValidateError = document.getElementById("emailValidateError");
const passwordValidateError = document.getElementById("passwordValidateError");
const confirmPasswordValidateError = document.getElementById("confirmPasswordValidateError");

const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", (event) => {
    let check = true;

    if (!email.value) {
        emailValidateError.innerText = "Please type in email";
        check = false;
    }
    if (!password.value) {
        passwordValidateError.innerText = "Please type in password";
        check = false;
    }
    if (!confirmPassword.value) {
        confirmPasswordValidateError.innerText = "Please type in confirm password";
        check = false;
    }
    else if (confirmPassword.value !== password.value) {
        confirmPasswordValidateError.innerText = "Confirm password not match";
        check = false;
    }
    
    if (!check) {
        event.preventDefault();
    }

})