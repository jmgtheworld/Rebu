
import {useState} from "react";
import * as FaIcons from 'react-icons/fa';
import './Pricebar.scss';
import "./UserSummary.scss";

export default function UserSummary(props) {

  const {travelTD} = props;

  const [priceMenu, setpriceMenu] = useState(false);
  const [price, setPrice] = useState("");

  const distanceInNumber = Math.round(parseFloat(travelTD.distance.replace("km", "")))
  const priceRange = [];

  const priceRangeGenerator = distanceInNumber => {
    const medianPrice = (distanceInNumber * 3.0);
    const startingPrice = medianPrice - 2.0;
    const highestPrice = medianPrice + 3.0;

    for (let i = startingPrice; i <= highestPrice; i++) {
      priceRange.push({
        price: i
      })
    }

    return priceRange
  }

  const PriceRange = priceRangeGenerator(distanceInNumber)
 
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
      <h3> Distance from current location to home: {travelTD.distance} ({travelTD.time}) </h3>
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