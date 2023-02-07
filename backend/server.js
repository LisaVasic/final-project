import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  accessToken: {
    type: String, 
    default: ()=> crypto.randomBytes(128).toString("hex")}
});

const User = mongoose.model('User', UserSchema);

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Trip planner");
});

//Sign up 
app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try{
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  }catch (error){
    res.status(400).json({
      success: false,
      response: error.message
    });
  }
});

//Login
app.post('/login', async (req, res) =>{
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});

//Middleware that checks accessTokens that are created when a user is registered
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
};

//app.get("/addtrip", authenticateUser);
app.get("/addtrip", (req, res)=> {
  res.status(200).json({success: true, response: "Where to next?"});
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





// FIRST TRY


// from Van
/*const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: ()=> crypto.randomBytes(128).toString('hex')
  }
 });
*/



 /*const authenticateUser = async (req, res, next) => {
   const user = await User.findOne ({accessToken: req.header('Authorization')});
   if(user){
    req.user = user;
    next();
   }else {
    res.status(401).json({loggedOut: true});
   }
 }
*/

//Start and login page
/*
app.post('/users', async(req,res) => {
  try {
   const {username, password} =req.body;
   const user = new User ({username, password: bcrypt.hashSync(password)});
   user.save();
   res.status(201).json({id: user.id, accessToken: user.accessToken});
  } catch (err) {
    res.status(400).json({message: 'Could not create user', errors: err.errors});
  }
 });


//Add trip page
app.get('/addtrip', authenticateUser);
app.get('/addtrip', (req, res) =>{
  res.json({secret:'Hey traveler where to next?'})
});

/Checks that the user exists and that the password matches
app.post('/sessions', async(req, res) => {
  const user = await User.findOne({username: req.body.username});
  if(user && bcrypt.compareSync(req.body.password , user.password)){
    res.json({userId:user._id, accessToken:user.accessToken});
  }else{
    res.json({notFound: true})
  }
});
//Add trip page
/*app.get('/addtrip', authenticateUser);
app.get("/addtrip", (req, res) => {
  const secret = "Hi traveler, where to next?"
  try{
    res.status(200).json({
      success: true,
      secret,
    });
  } catch(error){
    res.status(401).json({
      success: false,
      response: "Access denied",
    });
  }
})*/
