const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

function togglePassword(id, el) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
  el.textContent = input.type === "password" ? "👁️" : "🙈";
}

document.getElementById("btnRegister").addEventListener("click", async (e) =>{
  e.preventDefault()
  const data = {
  username: document.getElementById("username").value,
  email: document.getElementById("email").value,
  address: "", 
  role: document.getElementById("role").value,
  password: document.getElementById("password").value
};

console.log(data)
  const res = await fetch("http://localhost:3000/api/register",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(data)  });

    const result =await res.json();

console.log(result.message || result.error);
if(!result.error){
 alert("registrado exitosamente")
 window.location.reload()
}


})

//username,email,phone,addres,role,ava

