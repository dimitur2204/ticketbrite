import Layout from '../layout/Layout';
import { UserPayload } from '../signup-form/helpers';

export type IndexPageProps = {
	currentUser: UserPayload;
};
export default function IndexPage({ currentUser }: IndexPageProps) {
	return (
		<Layout maxWidth={false} disableOffset disableGutters>
			{currentUser ? 'You are signed in' : 'You are NOT signed in'}
		</Layout>
	);
}
