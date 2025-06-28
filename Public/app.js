async function signup() {
  const username = document.getElementById("signupusername").value;
  const password = document.getElementById("signuppassword").value;

  const res = await axios.post("http://localhost:3000/signup", {
    username: username,
    password: password,
  });
  alert(res.data);
}
async function getUserInformation() {
  const res = await axios.get("http://localhost:3000/me", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  const information = document.getElementById("information");
  information.innerHTML = "";
  let p1 = document.createElement("p");
  p1.innerText = "Username : " + res.data.username;

  let p2 = document.createElement("p");
  p2.innerText = "Password :" + res.data.password;

  information.appendChild(p1);
  information.appendChild(p2);
}
async function signin() {
  const username = document.getElementById("signinusername").value;
  const password = document.getElementById("signinpassword").value;

  const res = await axios.post("http://localhost:3000/signin", {
    username: username,
    password: password,
  });
  localStorage.setItem("token", res.data);
  alert("Signed In Successfully");
  getUserInformation();
}

function logout() {
  localStorage.removeItem("token");
  getUserInformation();
}
