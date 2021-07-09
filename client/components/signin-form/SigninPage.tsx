import React from 'react';
import Container from '@material-ui/core/Container';

import Layout from '../layout/Layout';
import SigninForm from './SigninForm';

export default function SigninPage() {
	return (
		<Layout title="Signin form">
			<Container maxWidth="lg">
				<SigninForm />
			</Container>
		</Layout>
	);
}
