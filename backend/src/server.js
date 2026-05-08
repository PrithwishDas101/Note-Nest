import express, { json } from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json())

connectDB();

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);

});