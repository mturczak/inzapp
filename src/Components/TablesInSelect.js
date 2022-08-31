import React from "react";

const TablesInSelect = (props) => {
  return (
    <>
      {props.passedOptions.map((option, index) => {
        return (
          <option key={option.id_tables} value={option.id_tables}>
            {option.name} {option.location}
          </option>
        );
      })}
    </>
  );
};

export default TablesInSelect;
