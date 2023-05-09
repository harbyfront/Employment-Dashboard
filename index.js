const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); 

const auth = require("./routes/auth");
const jobs = require("./routes/jobs");


app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

app.use("/auth", auth);
app.use("/jobs", jobs);
