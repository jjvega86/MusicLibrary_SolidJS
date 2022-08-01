require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
const teams = require("./routes/teams");

// Create database connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/teams", teams);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server active on PORT ${port}`);
});
