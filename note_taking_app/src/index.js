import express from "express";
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
		else return res.status(404).send({ errro: "category not found" });
	}
	res.status(201).send(notes);
});
