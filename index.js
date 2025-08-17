<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth site</title>
</head>
<style>
    /* Reset & base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.container {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.6rem;
  color: #1e3c72;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #1e3c72;
  box-shadow: 0 0 6px rgba(30,60,114,0.3);
}

button {
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

button:active {
  transform: scale(0.97);
}

#information {
  margin: 1rem 0;
  padding: 1rem;
  background: #f4f6fb;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #444;
  text-align: left;
  word-wrap: break-word;
}

.logout-btn {
  margin-top: 1.5rem;
  width: 100%;
  background: crimson;
}

</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.min.js"></script>
<body>
    <div>
    Signup
    <input type="text" id="username" placeholder="Username">
    <input type="password" id="password" placeholder="Password">
    <button onclick="signup()">Submit</button>
</div>
    <div>
    Signin
    <input type="text" id="signin-username" placeholder="Username">
    <input type="password" id="signin-password" placeholder="Password">
    <button onclick="signin()">Submit</button>
</div>
<div>
    User information: 
    <div id="information">
        <button onabort="getUserInformation()">Refresh it bro dont click </button>

    </div>
</div>
<div>
    <button onclick="logout()">Logout</button>
</div>

<script>
    async function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await axios.post("http://localhost:3000/signup", {
        username: username,
        password: password
    })
    alert("Signed up successfully");
}
async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    const response = await axios.post("http://localhost:3000/signin", {
        username: username,
        password: password
    });    
   
    localStorage.setItem("token", response.data.token);  //local storage hota hai in inspect => application

    alert("Signed in successfully");
}

async function logout() {
    localStorage.removeItem("token");
}


async function getUserInformation() {
    

        const response = await axios.get("http://localhost:3000/me", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        document.getElementById("information").innerHTML = "username: " + response.data.username + " password: " + response.data.password;
    }

console.log(getUserInformation());
</script>

</body>
</html>
