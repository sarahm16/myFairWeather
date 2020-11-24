const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const compression = require('compression')

const path = require('path');

const users = require('./routes/api/users');
const hikes = require('./routes/api/hikes')

const router = express.Router();

const app = express();

//compress all responses
app.use(compression());

if(process.env.NODE_ENV === "production")
{
  app.use(express.static('client/build'));
}

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

// const extendTimeoutMiddleware = (req, res, next) => {
//   const space = ' ';
//   let isFinished = false;
//   let isDataSent = false;

//   // Only extend the timeout for API requests
//   if (!req.url.includes('/api')) {
//     next();
//     return;
//   }

//   res.once('finish', () => {
//     isFinished = true;
//   });

//   res.once('end', () => {
//     isFinished = true;
//   });

//   res.once('close', () => {
//     isFinished = true;
//   });

//   res.on('data', (data) => {
//     // Look for something other than our blank space to indicate that real
//     // data is now being sent back to the client.
//     if (data !== space) {
//       isDataSent = true;
//     }
//   });

//   const waitAndSend = () => {
//     setTimeout(() => {
//       // If the response hasn't finished and hasn't sent any data back....
//       if (!isFinished && !isDataSent) {
//         // Need to write the status code/headers if they haven't been sent yet.
//         if (!res.headersSent) {
//           res.writeHead(202);
//         }

//         res.write(space);

//         // Wait another 15 seconds
//         waitAndSend();
//       }
//     }, 15000);
//   };

//   waitAndSend();
//   next();
// };

// app.use(extendTimeoutMiddleware);

// DB Config
const db = require("./config/keys").mongoURI;

//previous process.env.DB_URI
//mongodb://heroku_sxjd6b94:tsn0hd4o017qp96chrgigvm008@ds357708.mlab.com:57708/heroku_sxjd6b94

// Connect to MongoDB
mongoose
  .connect(
    //db,
    process.env.DB_URI || 
    //"mongodb://userdb:userpassword1@ds357708.mlab.com:57708/heroku_sxjd6b94",
    "mongodb+srv://user:eLY9nMNSt8HzjZaF@cluster0.ahbmh.mongodb.net/heroku_sxjd6b94?retryWrites=true&w=majority",

    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use('/api/favorite', users)
app.use('/api/completed', users)
// app.use("/api/hikes", hikes);

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));