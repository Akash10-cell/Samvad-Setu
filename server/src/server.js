const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");

const app = require("./app");

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
