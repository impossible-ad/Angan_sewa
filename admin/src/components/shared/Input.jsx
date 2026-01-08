const Input = ({
  label,
  type,
  placeholder,
  id,
  required = false,
  value,
  onChange,
  className,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className={`${className}  border p-2 rounded`}
      />
    </div>
  );
};

export default Input;
