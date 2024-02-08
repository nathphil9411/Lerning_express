export const createuserValidationSchemas = {
	title: {
		notEmpty: { errorMessage: "Title cannot be empty" },
		isString: true,
	},
	content: {
		isOptional: true,
	},
};
