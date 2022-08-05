require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const { application } = require("express");
const express = require("express");
const reservationRoutes = require ('./routes/reservationRoutes')
const db = require("./models_seq")

//express app
const app = express();

// Middleware
app.use(express.json()); 
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
// app.use("/posts", require("./routes/postRoutes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {

  
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
  
  next();
});

// Listen on pc port

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })

  // routes
app.use('/reservation',reservationRoutes);

// connect to db
db.sequelize.sync().then(()=> {
  app.listen(6500, () => {
    console.log('connected to db,  port', 6500)
  })
})
// var mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'haslo',
//     database: 'inz_app'
//   });

// connection.connect(function(err) {
//          if (err) throw err;
//         console.log("Connected!");
// });

// connect to db
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("connected to database");
//     // listen to port
//     app.listen(process.env.PORT, () => {
//       console.log("listening for requests on port", process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// export default function handler(req, res) {
//   res.status(200).json({ something: "something" });
// }
