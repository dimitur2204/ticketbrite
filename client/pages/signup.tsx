import { NextPage } from 'next';
import buildClient from '../api/build-client';
import { UserPayload } from '../components/signup-form/helpers';
import SignupPageComponent from '../components/signup-form/SignupPage';
export const SignupPage: NextPage = () => <SignupPageComponent />;

SignupPage.getInitialProps = async (ctx) => {
	const { data } = await buildClient(ctx).get<UserPayload>(
		'/api/users/currentuser'
	);
	return data;
};

export default SignupPage;
