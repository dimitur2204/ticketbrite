import React from 'react';
import Container from '@material-ui/core/Container';

import Layout from '../layout/Layout';
import SignupForm from './SignupForm';

export default function SignupPage() {
	return (
		<Layout title="Signup form">
			<Container maxWidth="lg">
				<SignupForm />
			</Container>
		</Layout>
	);
}
