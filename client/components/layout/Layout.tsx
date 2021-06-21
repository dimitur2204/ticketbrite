import {
	Box,
	Container,
	ContainerProps,
	createStyles,
	makeStyles,
	Typography,
} from '@material-ui/core';

type LayoutProps = React.PropsWithChildren<
	ContainerProps & {
		title?: string;
		ogImage?: string;
		disableOffset?: boolean;
	}
>;

const useStyles = makeStyles((theme) =>
	createStyles({
		layout: {
			position: 'relative',
			minHeight: '100vh',
		},
		pageTitle: {
			padding: theme.spacing(4),
		},
		offset: {
			...theme.mixins.toolbar,
			marginBottom: theme.spacing(6),
			[theme.breakpoints.down('md')]: {
				marginBottom: theme.spacing(0),
			},
		},
	})
);

export default function Layout({
	title,
	ogImage,
	children,
	maxWidth = 'md',
	disableOffset = false,
	...containerProps
}: LayoutProps) {
	const classes = useStyles();
	return (
		<Container maxWidth="xl" disableGutters>
			<Container
				className={classes.layout}
				maxWidth={maxWidth}
				{...containerProps}
			>
				<Box pt={4} pb={disableOffset ? 0 : 10}>
					{!disableOffset && <div className={classes.offset} />}
					{title && (
						<Typography
							paragraph
							variant="h2"
							component="h1"
							align="center"
							className={classes.pageTitle}
						>
							{title}
						</Typography>
					)}
					{children}
				</Box>
			</Container>
		</Container>
	);
}
