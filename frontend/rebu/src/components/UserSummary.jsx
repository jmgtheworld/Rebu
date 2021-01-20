
import {Fragment, useState, useEffect, useCallback, useRef} from "react";
import Axios from 'axios';

import * as FaIcons from 'react-icons/fa';
import './Pricebar.scss';
import "./UserSummary.scss";

import Button from './Button';
import { Spinner } from 'react-bootstrap';

export default function UserSummary(props) {

  const {travelTD, origin, destination, startAddress, finishAddress} = props;

  const [priceMenu, setpriceMenu] = useState(false);
  const [price, setPrice] = useState(20);
  const [waiting, setWaiting]  = useState(false);

  const [ newTrip, setNewTrip ] = useState({
    customer_id: 1,
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

  const [loadedOnce, setloadedOnce] = useState(false);
  const [loadCancel, setloadCancel] = useState(false);

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

  useEffect(() => {
    if (loadedOnce) {
      setWaiting(true)
      console.log('newtrip', newTrip)
      return Axios.post("http://localhost:3001/trips", newTrip)
      .then(() => console.log("new trip request created"))
      .catch(err => console.log(err));
    }
  }, [loadedOnce])

  const requestTrip = useCallback(() => {
    setloadedOnce(true)
    setNewTrip({
      customer_id: 1,
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
  }, [price])

  useEffect(() => {
    if (loadCancel) {
      setWaiting(true)
      console.log('trip id to be deleted', 37)
      return Axios.put(`http://localhost:3001/trips/37/cancel`)
      .then(() => console.log("previous trip cancelled"))
      .catch(err => console.log(err));
    }
  }, [loadCancel])

  const cancelTrip = useCallback(() => {
    setloadCancel(true)
  }, [])

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
      <div className = "statusContainer">
        {waiting ? <Spinner animation="grow" variant="secondary" /> : <div></div>}
        <Button type = {waiting ? "Waiting for Driver" : "Search for Driver"} onClick = {requestTrip}/>
        {waiting ? <Button type = "Cancel Request" onClick = {cancelTrip}/> : <div></div> }
      </div>
    </Fragment>
    
  )
}