import "./Button.scss";

export default function Button(props) {
  const {type, onClick} = props;
  let buttonType;

  if (type === "Search for Driver") {
    buttonType = "btn btn-dark button"
  } 

  if (type === "Waiting for Driver") {
    buttonType = "btn btn-dark button"
  } 

  if (type === "Cancel Request") {
    buttonType = "btn btn-danger button"
  } 

  if (type === "Request accepted!") {
    buttonType = "btn btn-success button"
  }

  return (
    <button className = {buttonType} onClick = {onClick}> {type} </button> 
  )
}