import { useField } from 'formik';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
} from '@material-ui/core';

export type CheckboxFieldProps = {
	name: string;
	label: string | React.ReactNode;
};

export default function CheckboxField({ name, label }: CheckboxFieldProps) {
	const [field, meta] = useField(name);
	const helperText = meta.touched ? meta.error : '';
	return (
		<FormControl
			required
			component="fieldset"
			error={Boolean(meta.error) && Boolean(meta.touched)}
		>
			<FormControlLabel
				label={label}
				control={
					<Checkbox color="primary" checked={Boolean(field.value)} {...field} />
				}
			/>
			{Boolean(meta.error) && (
				<FormHelperText error>{helperText}</FormHelperText>
			)}
		</FormControl>
	);
}
