import express from "express";
const app = express();
const PORT = process.env.PORT || 9040;
app.listen(PORT, () => {
	console.log("we are here");
});
