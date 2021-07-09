import Link from 'next/link';
import Layout from '../layout/Layout';

export default function IndexPage() {
	return (
		<Layout maxWidth={false} disableOffset disableGutters>
			<Link href="/signup">Link</Link>
		</Layout>
	);
}
