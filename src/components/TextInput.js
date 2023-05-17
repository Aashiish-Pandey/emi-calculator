import React from "react";

const TextInput = ({title,state,setState}) => {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </React.Fragment>
  );
};

export default TextInput;
