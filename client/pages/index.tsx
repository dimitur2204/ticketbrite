import { NextPage } from 'next';
import buildClient from '../common/api/build-client';

import IndexPageComponent, {
	IndexPageProps,
} from '../components/index/IndexPage';
import { UserPayload } from '../components/signup-form/helpers';

const IndexPage: NextPage<IndexPageProps> = (props) => (
	<IndexPageComponent {...props} />
);

IndexPage.getInitialProps = async (ctx) => {
	const { data } = await buildClient(ctx).get<{ currentUser: UserPayload }>(
		'/api/users/currentuser'
	);
	return data;
};

export default IndexPage;
