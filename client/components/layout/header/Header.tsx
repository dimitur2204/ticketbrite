import { Box, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import theme from '../../../common/theme';
import LinkButton from '../../common/LinkButton';
import { UserPayload } from '../../signup-form/helpers';

export type HeaderProps = {
	currentUser: UserPayload;
};
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));

export default function Header({ currentUser }: HeaderProps) {
	const classes = useStyles();
	const links: [{ label: string; href: string; id: number }] = [
		!currentUser && { label: 'Sign up', href: '/signup', id: 1 },
		!currentUser && { label: 'Sign in', href: '/signin', id: 2 },
		currentUser && { label: 'Sign out', href: '/signout', id: 3 },
	].filter((linkConfig) => linkConfig);

	return (
		<div className={classes.grow}>
			<AppBar color="secondary" position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Material-UI
					</Typography>
					<div className={classes.grow} />
					{currentUser && (
						<Box marginRight={theme.spacing(1)}>
							<Typography variant="body2">
								Hello, {currentUser.email}
							</Typography>
						</Box>
					)}

					{links.map((link) => (
						<LinkButton key={link.id} href={link.href}>
							{link.label}
						</LinkButton>
					))}
				</Toolbar>
			</AppBar>
		</div>
	);
}
