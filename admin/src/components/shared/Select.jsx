import { useState } from "react";

const Select = ({
  options,
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

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │                           INITIAL RENDER PHASE                              │
// └─────────────────────────────────────────────────────────────────────────────┘

// 1. COMPONENT FUNCTION STARTS
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ const Select = ({ options, actions, itemId, placeholder }) => {         │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 2. STATE INITIALIZATION
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ const [selectedValue, setSelectedValue] = useState("");                 │
//    │ // selectedValue = ""                                                   │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 3. FUNCTION DEFINITION (NOT EXECUTION)
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ const handleChange = (e) => {                                           │
//    │   // Function is DEFINED but NOT CALLED yet                            │
//    │   // This code inside is NOT executed                                  │
//    │ };                                                                      │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 4. JSX RETURN STATEMENT STARTS
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ return (                                                                │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 5. SELECT ELEMENT CREATION
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ <select                                                                 │
//    │   value={selectedValue}  // value=""                                    │
//    │   onChange={handleChange}  // Event handler attached                    │
//    │   className="..."                                                       │
//    │ >                                                                       │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 6. PLACEHOLDER OPTION CREATION
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ <option value="">{placeholder}</option>                                 │
//    │ // Creates: <option value="">Select an option</option>                 │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 7. OPTIONS MAPPING EXECUTION
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ {options.map((option) => (                                              │
//    │   <option key={option.value} value={option.value}>                     │
//    │     {option.label}                                                      │
//    │   </option>                                                             │
//    │ ))}                                                                     │
//    │                                                                         │
//    │ // For options = [{label: "Delete", value: "delete"}]                  │
//    │ // Creates: <option value="delete">Delete</option>                     │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 8. JSX COMPLETE & DOM RENDERING
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ </select>                                                               │
//    │ );  // JSX complete                                                     │
//    │                                                                         │
//    │ // React renders to DOM:                                               │
//    │ // <select>                                                            │
//    │ //   <option value="">Select an option</option>                       │
//    │ //   <option value="delete">Delete</option>                           │
//    │ // </select>                                                           │
//    └─────────────────────────┬───────────────────────────────────────────────┘
//                              │
//                              ▼
// 9. USER SEES DROPDOWN
//    ┌─────────────────────────────────────────────────────────────────────────┐
//    │ Browser displays dropdown with:                                         │
//    │ ┌─────────────────────────┐                                            │
//    │ │ Select an option    ▼   │                                            │
//    │ └─────────────────────────┘                                            │
//    │                                                                         │
//    │ When clicked, shows:                                                    │
//    │ ┌─────────────────────────┐                                            │
//    │ │ Select an option        │                                            │
//    │ │ Delete                  │  ← This option is visible!                │
//    │ └─────────────────────────┘                                            │
//    └─────────────────────────────────────────────────────────────────────────┘
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │                          USER INTERACTION PHASE                             │
// └─────────────────────────────────────────────────────────────────────────────┘

// 10. USER CLICKS DROPDOWN
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │ User clicks on dropdown arrow                                          │
//     │ Browser shows all available options                                    │
//     │ No JavaScript code executes yet                                       │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 11. USER SELECTS "DELETE"
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │ User clicks on "Delete" option                                         │
//     │ Browser sets select.value = "delete"                                   │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 12. ONCHANGE EVENT FIRES
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │ Browser triggers onChange event                                        │
//     │ Event object created: e = { target: { value: "delete" } }             │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 13. HANDLECHANGE FUNCTION EXECUTES
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │ const handleChange = (e) => {                                          │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 14. VALUE EXTRACTION
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │   const value = e.target.value;                                        │
//     │   // value = "delete"                                                  │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 15. STATE UPDATE
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │   setSelectedValue(value);                                             │
//     │   // selectedValue changes from "" to "delete"                        │
//     │   // This triggers a re-render                                         │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 16. CONDITION CHECK
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │   if (value && actions[value]) {                                       │
//     │   // if ("delete" && actions["delete"]) {                             │
//     │   // if ("delete" && handleDelete) {                                  │
//     │   // if (true && function) { → TRUE                                   │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 17. ACTION EXECUTION
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │     actions[value](itemId);                                            │
//     │     // actions["delete"](manager.id);                                  │
//     │     // handleDelete(manager.id);                                       │
//     │     // Calls parent component's delete function                       │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 18. STATE RESET
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │     setSelectedValue("");                                              │
//     │     // selectedValue changes back to ""                               │
//     │     // This triggers another re-render                                │
//     └─────────────────────────┬──────────────────────────────────────────────┘
//                               │
//                               ▼
// 19. FUNCTION ENDS & RE-RENDER
//     ┌────────────────────────────────────────────────────────────────────────┐
//     │   }                                                                    │
//     │ };                                                                     │
//     │                                                                        │
//     │ // Component re-renders with selectedValue = ""                       │
//     │ // Dropdown shows placeholder again                                   │
//     └────────────────────────────────────────────────────────────────────────┘
