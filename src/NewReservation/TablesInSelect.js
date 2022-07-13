import React from "react";

const TablesInSelect = (props) => {
  return (
    <>
      {props.passedOptions.map((option, index) => {
        return (
          <option key={index} value={option.id}>
            {option.id}
          </option>
        );
      })}
    </>
  );
};

export default TablesInSelect;
