import React from "react";

function Title(props) {
  let tripAmountArrLength = props.selectedDate.length;
  let timeDisplay;

  if (tripAmountArrLength === 1) {
    timeDisplay = `There is ${tripAmountArrLength} trip today`;
  } else if (tripAmountArrLength > 1) {
    timeDisplay = `There are ${tripAmountArrLength} trips today`;
  } else {
    ("Please select a date!");
  }

  return (
    <div>
      <h2>{props.titleDate} </h2>
      <h4>{timeDisplay}</h4>
    </div>
  );
}

export default Title;
