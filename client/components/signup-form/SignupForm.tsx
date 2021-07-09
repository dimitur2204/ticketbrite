import React from 'react';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';

import { customValidationMsg } from '../../common/form/validators';
import SubmitButton from '../common/form/SubmitButton';
import GenericForm from '../common/form/GenericForm';
import FormTextField from '../common/form/FormTextField';
import useRequest from '../../common/hooks/use-request';

export type SignupFormData = {
	email: string;
	password: string;
};

const validationSchema: yup.SchemaOf<SignupFormData> = yup
	.object()
	.defined()
	.shape({
		email: yup
			.string()
			.email(customValidationMsg.emailMsg('Email'))
			.required(customValidationMsg.requiredMsg('Email')),
		password: yup
			.string()
			.min(6, customValidationMsg.minLenMsg('Password', 6))
			.required(customValidationMsg.requiredMsg('Password')),
	});

const defaults: SignupFormData = {
	email: '',
	password: '',
};
export type SignupFormProps = { initialValues?: SignupFormData };

export default function SignupForm({
	initialValues = defaults,
}: SignupFormProps) {
	const { doRequest } = useRequest<{ email: string; password: string }>({
		url: '/api/users/signup',
		method: 'post',
	});
	const onSubmit = async ({ email, password }: SignupFormData) => {
		// todo: Move into epic with redux-observable when implemented
		doRequest({ email, password });
	};

	return (
		<GenericForm
			onSubmit={onSubmit}
			initialValues={initialValues}
			validationSchema={validationSchema}
		>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<FormTextField type="text" label="Email" name="email" />
				</Grid>
				<Grid item xs={12}>
					<FormTextField type="password" label="Password" name="password" />
				</Grid>
				<Grid item xs={12}>
					<SubmitButton fullWidth label="Register" />
				</Grid>
			</Grid>
		</GenericForm>
	);
}
