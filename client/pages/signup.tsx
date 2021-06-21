import React from 'react';
import { GetServerSideProps } from 'next';

import SignupPage from '../components/signup-form/SignupPage';

export const getServerSideProps: GetServerSideProps = async () => ({
	props: {},
});

export default SignupPage;
