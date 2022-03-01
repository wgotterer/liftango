import React from "react";
import styled from "styled-components";

const StyledMarker = styled.div`
  height: 30px;
  width: 30px;
  background-color: white;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  outline: 2px solid;
  outline-color: ${(props) => (props.type === "departure" ? "green" : "red")};
  align-items: baseline;
  :after {
    content: "";
    background: ${(props) => (props.type === "departure" ? "green" : "red")};
    height: 20px;
    width: 2px;
    position: absolute;
    margin-top: 30px;
   
  }
`;

const MarkerLetter = styled.div`
  margin-top: 9px;
  color: black;
`;

const MapMarkerPin = ({ type }) => {
  console.log(type);
  return (
    <StyledMarker type={type}>
      {/* getting first letter of tring */}
      <MarkerLetter>{type[0].toUpperCase()}</MarkerLetter>
    </StyledMarker>
  );
};

export default MapMarkerPin;
