import React from "react";

const TablesInSelect = (props) => {
  return (
    <>
      {props.passedOptions.map((option, index) => {
        return (
          <option key={index} value={option.id_tables}>
            {option.name} {option.location}
          </option>
        );
      })}
    </>
  );
};

export default TablesInSelect;
