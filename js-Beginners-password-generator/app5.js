const inputField = document.querySelector("input");
const clearInputField = document.querySelector(".fa-times");
const maskInputField = document.querySelector(".fa-eye-slash");
const generatedField = document.querySelector(".copy-it");
const alterGeneratedField = document.querySelector(".fa-sync-alt");
const copyGeneratedField = document.querySelector(".fa-copy");
const passLeter = "abcdefghijklmnopqrstuvwzyz0123456789!@#$%^&*()_+=-?/";

const delPassword = () => {
  inputField.value = "";
  inputField.placeholder = "Your password pls...";
};

const maskPassword = () => {
  maskInputField.classList.toggle("fa-eye-slash");
  maskInputField.classList.toggle("fa-eye");
  if (maskInputField.classList.contains("fa-eye-slash"))
    inputField.type = "password";
  else inputField.type = "text";
};

const generatePassword = () => {
  temp = "";
  for (let i = 0; i < 16; i++) {
    temp += passLeter.charAt(Math.floor(Math.random() * passLeter.length));
  }
  generatedField.value = temp;
};

const copyPassword = () => {
  if (generatedField.value !== "Generate Password...") generatedField.select();
  document.execCommand("copy");
};

clearInputField.addEventListener("click", delPassword);
maskInputField.addEventListener("click", maskPassword);
alterGeneratedField.addEventListener("click", generatePassword);
copyGeneratedField.addEventListener("click", copyPassword);
