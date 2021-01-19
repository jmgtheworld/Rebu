
import {Fragment, useState, useEffect} from "react";
import Axios from 'axios';

import * as FaIcons from 'react-icons/fa';
import './Pricebar.scss';
import "./UserSummary.scss";

import Button from './Button';

export default function UserSummary(props) {

  const {travelTD, origin, destination, startAddress, finishAddress} = props;

  const [priceMenu, setpriceMenu] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/:id`)//would be /api/users/:id instead
      .then((res) => {
        console.log(res.data.id);
      }).catch(err => console.log(err));
  }, []);

  const [ newTrip, setNewTrip ] = useState({
    customer_id: null,
    driver_id: null,
    start_address: startAddress,
    end_address: finishAddress,
    start_location_lat: origin.lat,
    start_location_lon: origin.lng,
    end_location_lat: destination.lat,
    end_location_lon: destination.lng,
    accepted: false,
    payment_amount: price,
    payment_status: false,
    created_at: Date.now(),
    ended_at: null
  })
 

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

  function requestTrip () {
    setNewTrip({...newTrip})

    return Axios.post("http://localhost:3001/trips", newTrip)
    .then(() => console.log("new trip request created"))
    .catch(err => console.log(err));
  }

  return (
    <Fragment>
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
      <Button type = "Search for Driver"/>
    </Fragment>
    
  )
}