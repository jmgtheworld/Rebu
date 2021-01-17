import PriceRange from "./PriceRange"
import {useState} from "react";
import * as FaIcons from 'react-icons/fa';
import './Pricebar.scss';
import "./UserSummary.scss";

export default function UserSummary(props) {

  const [priceMenu, setpriceMenu] = useState(false);
  const [price, setPrice] = useState("");
  let range = {};

  const getPriceRange = PriceRange => {
    const lowest = PriceRange[0];
    const highest = PriceRange[PriceRange.length - 1];

    range = {
      lowest,
      highest
    }
    return range
  }

  getPriceRange(PriceRange)
  console.log(range)

  const listofPrice = PriceRange.map( (item, index) => {
    return <li key = {index} 
               className = "priceItem" 
               onClick ={
                 () => {
                   setPrice(item.price)
                   showPrice()        
                  }
                 }>
               ${item.price} 
            </li>
  })

  const showPrice = () => {
    setpriceMenu(!priceMenu);
  }

  return (
    <article className = "userSummary">
      <h3> Distance from current location to home: 12.7km </h3>
      <h4> Estimated Price Range: ${range.lowest.price} - ${range.highest.price}</h4> 
      <FaIcons.FaAngleDown onClick = {showPrice} className = "dropdown"/> 
      <div className = {priceMenu ? 'show' : 'hide' }>
        {listofPrice}
      </div>
      <div className = "selectedPrice"> 
        ${price}
      </div>
    </article>
  )
}