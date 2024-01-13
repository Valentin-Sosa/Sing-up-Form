const form = document.querySelector("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const errors = document.getElementsByClassName("error");

firstName.addEventListener("input", ()=> checkValidation(firstName,0));
lastName.addEventListener("input", ()=> checkValidation(lastName,1));
email.addEventListener("input", ()=> checkValidation(email,2));
phoneNumber.addEventListener("input", ()=> checkValidation(phoneNumber,3));
password.addEventListener("input", ()=>{
    checkValidation(password,4)
    checkPassword();
} );
confirmPassword.addEventListener("input", ()=> checkPassword());

form.addEventListener("submit", event=>
{
    if(!form.checkValidity() || !areEqualsPasswords())
    {
        event.preventDefault();
        checkAllInputs();
    }
})

function checkAllInputs()
{        
    const inputs = [firstName,lastName,email,phoneNumber,password,confirmPassword];
    for(let i = 0; i<5; i++) checkValidation(inputs[i],i);
    checkPassword();
}

function checkValidation(input,numberError)
{
    if(input.validity.valid)
    {
        errors[numberError].textContent = "";
        errors[numberError].className = "error";
        input.className = "valid";
    }
    else showError(input,numberError);
}

function showError(input,numberError)
{
    if(input.validity.patternMismatch)
    {
        if(numberError === 0 || numberError === 1) 
            errors[numberError].textContent = "Entered value cannot contain numbers";
        else  errors[numberError].textContent = "Entered value cannot contain letters";
    }
    else if(input.validity.valueMissing)
    {
        errors[numberError].textContent = "*This field is required";
    }
    else if(input.validity.typeMismatch)
    {
        errors[numberError].textContent = "Entered value needs to be an email address.";
    }
    else if(input.validity.tooShort) 
    {
        errors[numberError].textContent = `Password should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    }
    errors[numberError].className = "error active";
    input.className = "invalid";
}

function areEqualsPasswords()
{
    return password.value === confirmPassword.value;
}

function showPasswordError()
{
    if(confirmPassword.validity.valueMissing)
    {
        errors[5].textContent = "*This field is required";
    }
    else if(!areEqualsPasswords())
    {
        errors[5].textContent = "Passwords do not match";
    }
    errors[5].className = "error active";
    confirmPassword.className = "invalid";
}

function checkPassword()
{
    if(areEqualsPasswords() && confirmPassword.validity.valid)
    {
        errors[5].textContent = "";
        errors[5].className = "error";
        confirmPassword.className = "valid";
    }
    else showPasswordError();    
}
