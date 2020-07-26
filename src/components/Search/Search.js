import React, { useState } from "react";

export const Search = ({ onSearch, setFilterInputBtn }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search and filter"
        className="form-control"
        value={input}
        onChange={handleChange}
        onFocus={() => setFilterInputBtn(false)}
      />
    </div>
  );
};
