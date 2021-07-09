import { useEffect } from 'react';
import Router from 'next/router';
import { Typography } from '@material-ui/core';
import useRequest from '../common/hooks/use-request';

export default function Signout() {
	const { doRequest } = useRequest({
		url: '/api/users/signout',
		method: 'post',
		onSuccess: () => Router.push('/'),
	});
	useEffect(() => {
		doRequest({});
	}, [doRequest]);
	return <Typography>Signing you out</Typography>;
}
