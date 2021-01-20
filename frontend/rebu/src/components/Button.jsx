import "./Button.scss";

export default function Button(props) {
  const {type, onClick} = props;
  let buttonType;

  if (type === "Search for Driver") {
    buttonType = "btn btn-dark button"
  } 

  if (type === "Waiting for Driver") {
    buttonType = "btn btn-dark button waiting"
  } 

  if (type === "Cancel Request") {
    buttonType = "btn btn-danger waiting"
  } 

  return (
    <button className = {buttonType} onClick = {onClick}> {type} </button> 
  )
}