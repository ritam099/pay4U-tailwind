const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submitBtn = document.getElementById('submitBtn');
const ageInfo = document.getElementById('age-info');

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const dobValue = dob.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let formValid = true;

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        formValid = false;
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        formValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        formValid = false;
    } else {
        setSuccessFor(email);
    }

    const age = calculateAge(dobValue);
    ageInfo.innerText = `Your age: ${age}`;
    if (dobValue === '') {
        setErrorFor(dob, 'DOB cannot be blank');
        formValid = false;
    } else if (age < 18) {
        setErrorFor(dob, 'You must be at least 18 years old');
        formValid = false;
    } else {
        setSuccessFor(dob);
    }

    
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        formValid = false;
    } else if (!isValidPassword(passwordValue)) {
        setErrorFor(password, 'Min 8 characters with both letters and numbers');
        formValid = false;
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password confirmation cannot be blank');
        formValid = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
        formValid = false;
    } else {
        setSuccessFor(password2);
    }

    submitBtn.disabled = !formValid;
    return formValid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isValidPassword(password) {
    const minLength = 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    return password.length >= minLength && hasLetters && hasNumbers;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (checkInputs()) {
        // Submit form or perform actions if all fields are valid
        alert('Form submitted successfully!');
    }
});

username.addEventListener('input', checkInputs);
email.addEventListener('input', checkInputs);
dob.addEventListener('input', checkInputs);
password.addEventListener('input', checkInputs);
password2.addEventListener('input', checkInputs);
