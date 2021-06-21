const customValidationMsg = {
	requiredMsg: (fieldName: string) => `${fieldName} is required`,
	minLenMsg: (fieldName: string, length: number) =>
		`${fieldName} should be at least ${length} characters long`,
	maxLenMsg: (fieldName: string, length: number) =>
		`${fieldName} should be up to ${length} characters long`,
	emailMsg: (fieldName: string) => `${fieldName} should be a valid email`,
};
export { customValidationMsg };
