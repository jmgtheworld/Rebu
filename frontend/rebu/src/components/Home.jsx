import {Fragment} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';
import Button from './Button';

export default function Home(props) {
  return (
    <Fragment>
      <div className = "map">
        <Map />
      </div>
      <UserSummary />
      <Button type = "Search for Driver"/>
    </Fragment>

  )
}