import React, { useState } from "react";
import postApi from "../lib/postApi";
const Mark = ({ propertyId, mark }) => {
  const [activeMark, setActiveMark] = useState(mark);
  const handleClick = () => {
    postApi(`/users/markinterested/${propertyId}`).then((res) => {
      setActiveMark(true);
    });
  };
  return (
    <>
      {activeMark ? (
        <div>Already Interested</div>
      ) : (
        <button onClick={handleClick}>I'm Interested</button>
      )}
    </>
  );
};

export default Mark;
