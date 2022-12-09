const express = require("express");
const app = express();

const connectDB = require("./config/db");
const cors = require("cors");
const auth = require("./middleware/auth");

connectDB();

app.use(cors());
app.use(express.json());

const CourseRoutes = require("./routes/CourseRoutes");
const UserRoutes = require("./routes/UserRoutes");
const OtherRoutes = require("./routes/OtherRoutes");
app.use("/course/", CourseRoutes);
app.use("/user/", UserRoutes);
app.use("/other/", OtherRoutes);

app.get("/", async (req, res) => {
  res.send("Route testing");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
