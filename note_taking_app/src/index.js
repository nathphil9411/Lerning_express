import express from "express";
import {
	body,
	matchedData,
	validationResult,
	checkSchema,
} from "express-validator";
import { createuserValidationSchemas } from "../utils/validationSchema.js";
const app = express();
const PORT = process.env.PORT || 9040;
app.listen(PORT, () => {
	console.log("we are here");
});

// No Database implementation so we use a temporal solution
let notes = [
	{
		id: 1,
		title: "Note 1",
		content: "Lorem ipsum dolor sit amet.",
		date: new Date(),
		cat: "engineering",
	},
	{
		id: 2,
		title: "Note 2",
		content: "Consectetur adipiscing elit.",
		date: new Date(),
		cat: "fitness",
	},
	{
		id: 3,
		title: "Note 3",
		content:
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		date: new Date(),
		cat: "beauty",
	},
	{
		id: 4,
		title: "Note 4",
		content: "Ut enim ad minim veniam.",
		date: new Date(),
		cat: "beauty",
	},
	{
		id: 5,
		title: "Note 5",
		content:
			"Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		date: new Date(),
		cat: "fitness",
	},
	{
		id: 6,
		title: "Note 6",
		content:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		date: new Date(),
		cat: "fitness",
	},
];

//middlewares
app.use(express.json());

const confirmId = (req, res, next) => {
	const {
		params: { id },
	} = req;
	console.log(id);
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) res.status(401).send("enter a valid id");
	const findNoteIndex = notes.findIndex((note) => {
		return note.id === parsedId;
	});
	req.findNoteIndex = findNoteIndex;
	next();
};
//Home page
app.get("/", (req, res) => {
	res.status(201).send("We have different endpoints make a note today");
});

//Get all users and filter by category
app.get("/api/notes", (req, res) => {
	const {
		query: { cat },
	} = req;

	console.log(cat);

	if (cat) {
		const filtereNotes = notes.filter((note) => note.cat === cat);
		if (filtereNotes.length > 0) return res.send(filtereNotes);
		else return res.status(404).send({ errror: "category not found" });
	}
	res.status(201).send(notes);
});

//creating a new note
app.post("/api/notes", checkSchema(createuserValidationSchemas), (req, res) => {
	const result = validationResult(req);

	if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
	const data = matchedData(req);

	const id = notes.length + 1;
	const newNote = { id: id, date: new Date(), ...data };
	notes.push(newNote);
	res
		.status(201)
		.send(`New note have been added, you have  made a total of ${id}notes`);
});

//editing a note
app.put("/api/notes/:id", confirmId, (req, res) => {
	const { body, findNoteIndex } = req;

	if (findNoteIndex === -1) res.status(404).send("note not found");
	console.log(findNoteIndex);

	notes[findNoteIndex] = { id: notes[findNoteIndex].id, ...body };
	res.status(201).send("note updated succefully");
});

app.delete("/api/notes/:id", confirmId, (req, res) => {
	const { body, findNoteIndex } = req;

	if (findNoteIndex === -1) res.status(404).send("note not found");

	notes.splice(findNoteIndex, 1);
	res.status(201).send("note deleted succefully");
});
