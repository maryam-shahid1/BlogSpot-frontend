import React from "react";

function Filter({ checkedItems, updateCheckedItems }) {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    updateCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  return (
    <div className="filter-div">
      <strong>Filter:</strong>
      <label>
        <input
          type="checkbox"
          name="Technology"
          checked={checkedItems.Technology}
          onChange={handleCheckboxChange}
        />
        Tech
      </label>

      <label>
        <input
          type="checkbox"
          name="Food"
          checked={checkedItems.Food}
          onChange={handleCheckboxChange}
        />
        Food
      </label>

      <label>
        <input
          type="checkbox"
          name="Lifestyle"
          checked={checkedItems.Lifestyle}
          onChange={handleCheckboxChange}
        />
        Lifestyle
      </label>
    </div>
  );
}

export default Filter;

