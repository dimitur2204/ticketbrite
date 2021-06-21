import React from 'react';
import { useField } from 'formik';
import { TextFieldProps } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export type RegisterFormProps = {
	type: string;
	label: string;
	name: string;
} & TextFieldProps;

export default function FormTextField({
	label,
	name,
	...textFieldProps
}: RegisterFormProps) {
	const [field, meta] = useField(name);
	const helperText = meta.touched ? meta.error : '';
	return (
		<TextField
			fullWidth
			label={label}
			size="small"
			error={Boolean(meta.error) && Boolean(meta.touched)}
			helperText={helperText}
			{...textFieldProps}
			{...field}
		/>
	);
}
