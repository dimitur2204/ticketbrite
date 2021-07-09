import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../common/theme';
import Header from '../components/layout/header/Header';
import buildClient from '../common/api/build-client';
import { UserPayload } from '../components/signup-form/helpers';

const MyApp = (props: AppProps & { currentUser: UserPayload }) => {
	const { Component, pageProps, currentUser } = props;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Ticketbrite</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Header currentUser={currentUser} />
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
};

MyApp.getInitialProps = async (appContext: any) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get<UserPayload>('/api/users/currentuser');
	const pageProps = appContext.Component.getInitialProps
		? await appContext.Component.getInitialProps(appContext.ctx)
		: null;

	return {
		pageProps,
		...data,
	};
};

export default MyApp;
