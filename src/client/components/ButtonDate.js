import React from "react";

function ButtonTime(props) {
  // slice to just grab the day, month, and date num
  const formatDate = props.date.slice(0, 10);

  return (
    <div>
      <h3>Trip date:</h3>
      <button
        style={style.button}
        onClick={() => props.handleDisplayTitle(formatDate)}
      >
        {formatDate}
      </button>
    </div>
  );
}

const style = {
  button: {
    color: "green",
    padding: 10,
  },
};

export default ButtonTime;
