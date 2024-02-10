import express from "express";
const app = express();
const PORT = process.env.PORT || 9040;
import userrouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";

//middlewares
app.use(express.json());
app.use(userrouter);
app.use(notesRouter);

app.get("/", (req, res) => {
	res.cookie("hello", "express", {
		maxAge: 60000,
		httpOnly: true,
		secure: true,
	});
	res.status(201).send("here i am using express");
});

app.listen(PORT, () => {
	console.log("we are here");
});
