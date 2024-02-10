import { notes } from "./constants.js";
export const confirmId = (req, res, next) => {
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
