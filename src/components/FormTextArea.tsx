import { FieldProps } from 'formik';
import { FaExclamationCircle } from 'react-icons/fa';

type Props = FieldProps & {
  label?: string;
};

const FormTextArea = ({ field, label, form: { touched, errors } }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="capitalize text-lg">{label || field.name}</label>
      <textarea
        {...field}
        className="focus:outline-none text-base border border-slate-300 focus:border-primary-500 bg-primary-50 px-2 py-1 rounded-md resize-none"
      
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-500 flex items-center gap-1 text-sm">
          <FaExclamationCircle />
          <span>{errors[field.name] as string}</span>
        </div>
      )}
    </div>
  );
};

export default FormTextArea;
