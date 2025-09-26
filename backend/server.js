const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();  


const connectDB = require("./config/databaseConnect"); //? Import database connection utility
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

connectDB(); //! Initialize MongoDB connection

// Initialize promotion cron jobs after database connection

//! Routes for declared endpoints
app.use("/" , require("./routes/health")); //? Test route to check if the server is running

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});