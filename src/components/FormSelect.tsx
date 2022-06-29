import { FieldProps } from 'formik';
import { FaCaretDown } from 'react-icons/fa';
import { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

type Props = FieldProps & {
  label?: string;
  options: string[];
};

const FormSelect = ({
  field,
  label,
  options,
  form: { setFieldValue }
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowDropdown(false));

  return (
    <div className="flex flex-col gap-2">
      <label className="capitalize text-lg">{label || field.name}</label>
      <div
        tabIndex={0}
        className="text-base focus:outline-none border border-slate-300 focus:border-primary-500 bg-primary-50 px-2 py-1 rounded-md flex justify-between items-center relative cursor-default"
        ref={ref}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{field.value}</span>
        <FaCaretDown />
        {showDropdown && (
          <ul className="absolute left-0 top-[calc(100%+.4rem)] bg-white border border-primary-500 w-full shadow-sm rounded-md overflow-hidden">
            {options.map((option) => (
              <li
                key={option}
                className="px-2 py-1 text-gray-500 hover:text-white hover:bg-primary-500"
                onClick={() => setFieldValue(field.name, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
