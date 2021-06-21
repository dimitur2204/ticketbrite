import { GetServerSideProps } from 'next';

import IndexPage from '../components/index/IndexPage';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};

export default IndexPage;
