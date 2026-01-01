import { useState } from "react";

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  actions = {},
  itemId,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Execute the corresponding action if it exists
    if (value && actions[value]) {
      actions[value](itemId);
      // Reset after action completes
      setSelectedValue("");
    }
  };
  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="px-3 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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

// **Flow diagram:**
// ```
// User selects "Delete" from dropdown
//          ↓
// <select> triggers onChange event
//          ↓
// handleChange(e) is called
//          ↓
// selectedValue = e.target.value  // "delete"
//          ↓
// actions["delete"](itemId)
//          ↓
// handleDelete() is executed in Provinces.jsx
