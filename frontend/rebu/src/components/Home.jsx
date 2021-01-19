import {useState, Fragment} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';
import Button from './Button';

export default function Home(props) {

  const [travelTD, settravelTD] = useState({
    time: "1",
    distance: "2",
  })

  return (
    <Fragment>
      <div className = "map">
        <Map travelTD = {travelTD} settravelTD = {settravelTD}/>
      </div>
      <UserSummary travelTD = {travelTD} settravelTD = {settravelTD}/>
      <Button type = "Search for Driver"/>
    </Fragment>

  )
}