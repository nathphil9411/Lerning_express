import { Router } from "express";
import { confirmId } from "../../utils/middleweare.js";
import { createuserValidationSchemas } from "../../utils/validationSchema.js";
import {
	body,
	matchedData,
	validationResult,
	checkSchema,
} from "express-validator";

import { notes } from "../../utils/constants.js";

const router = Router();

router.get("/api/notes", (req, res) => {
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
router.post(
	"/api/notes",
	checkSchema(createuserValidationSchemas),
	(req, res) => {
		const result = validationResult(req);

		if (!result.isEmpty())
			return res.status(400).send({ error: result.array() });
		const data = matchedData(req);

		const id = notes.length + 1;
		const newNote = { id: id, date: new Date(), ...data };
		notes.push(newNote);
		res
			.status(201)
			.send(`New note have been added, you have  made a total of ${id}notes`);
	}
);

//editing a note
router.put("/api/notes/:id", confirmId, (req, res) => {
	const { body, findNoteIndex } = req;

	if (findNoteIndex === -1) res.status(404).send("note not found");
	console.log(findNoteIndex);

	notes[findNoteIndex] = { id: notes[findNoteIndex].id, ...body };
	res.status(201).send("note updated succefully");
});

router.delete("/api/notes/:id", confirmId, (req, res) => {
	const { body, findNoteIndex } = req;

	if (findNoteIndex === -1) return res.status(404).send("note not found");

	notes.splice(findNoteIndex, 1);
	res.status(201).send("note deleted succefully");
});

export default router;
