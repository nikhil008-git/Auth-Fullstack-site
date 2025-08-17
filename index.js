import express from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = "nickhere";

const app = express();
app.use(express.json());

let users = [];
function logger(req,res,next){
    console.log(`request method is ${req.method}`)
    next()
}

//app.use(express.static("./public"))
app.get("/", function(req, res) {
    res.sendFile("D:/webdev-cohort/jwt_try/public/index.html")   ///for local host to frontend like smae port or endpoint to get rid of cors sort

})
// SIGNUP
app.post
('/signup',logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,  
        password: password
    });

    res.send({
        message: "User signed up successfully"
    });

    console.log(users);
});

// SIGNIN
app.post('/signin',logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) { 
        const token = jwt.sign(
            { username: user.username },    
            JWT_SECRET
        );

        res.send({
            message: "Signin successful",
            token: token
        });
    } else {
        res.status(401).send({
            message: "Invalid username or password"
        });
    }
});

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData.username){
        req.username = decodedData.username;
        next()
    }
    else{
        res.json({
            message : "you are not logged in!!"
        })
    } 
}
// Example protected route
app.get("/me", auth ,(req, res) => {
  

    const user = users.find(user => user.username === req.username);

    res.json({
        username: user.username,
        password: user.password
    });
});

 
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
