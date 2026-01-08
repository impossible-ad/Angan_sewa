const Select = ({
  onChange,
  value,
  options,
  placeholder = "Select an option",
  disabled = false,
  id,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      id={id}
      className={`${className} w-44 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
      ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
