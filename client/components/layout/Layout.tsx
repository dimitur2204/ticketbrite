import { Box, Container, ContainerProps, Typography } from '@material-ui/core';
import classes from './Layout.module.scss';

type LayoutProps = React.PropsWithChildren<
	ContainerProps & {
		title?: string;
		ogImage?: string;
		disableOffset?: boolean;
	}
>;

export default function Layout({
	title,
	ogImage,
	children,
	maxWidth = 'md',
	disableOffset = false,
	...containerProps
}: LayoutProps) {
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
