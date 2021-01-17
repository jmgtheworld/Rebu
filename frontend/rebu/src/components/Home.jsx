import {Fragment} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';
import Button from './Button';

export default function Home(props) {
  return (
    <Fragment>
      <Map />
      <UserSummary />
      <Button type = "Search for Driver"/>
    </Fragment>

  )
}