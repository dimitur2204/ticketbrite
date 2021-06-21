import { useField } from 'formik';
import { InputProps } from '@material-ui/core';
import Input from '@material-ui/core/Input';

type FormInputProps = InputProps & {
	name: string;
};

export default function FormInput({ name, ...props }: FormInputProps) {
	const [field] = useField(name);
	return <Input {...field} {...props} />;
}
