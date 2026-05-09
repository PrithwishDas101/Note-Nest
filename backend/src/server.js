import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json()) // parses json bodies: req.body
app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at PORT: ${PORT}`);

    });
});

