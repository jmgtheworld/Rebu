import "./Button.scss";

export default function Button(props) {
  const {type} = props;
  let buttonType;

  if (type === "Search for Driver") {
    buttonType = "btn btn-dark button"
  } 

  return (
    <button className = {buttonType}> {type} </button> 
  )
}