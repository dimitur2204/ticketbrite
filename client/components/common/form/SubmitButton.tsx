import React from 'react';
import { ButtonProps, CircularProgressProps } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from '../../../common/theme';

export type SubmitButtonProps = {
	loading?: boolean;
	label?: string;
	loadingColor?: CircularProgressProps['color'];
} & ButtonProps;

export default function SubmitButton({
	label = 'Submit',
	loading = false,
	loadingColor,
	...props
}: SubmitButtonProps) {
	const guessColor = props.color === 'primary' ? 'secondary' : 'primary';
	const progressColor = loadingColor ? loadingColor : guessColor;
	return (
		<Button
			type="submit"
			color="primary"
			variant="contained"
			disabled={loading}
			style={{ minWidth: theme.spacing(12) }}
			{...props}
		>
			{loading ? (
				<CircularProgress color={progressColor} size="1.5rem" />
			) : (
				label
			)}
		</Button>
	);
}
