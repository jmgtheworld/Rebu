import {Fragment} from 'react';

export default function Locate (props) {

  const {panTo, setOrigin} = props;

  return (
    <Fragment>
        <button
          className="locate"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log('locate position', position)
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setOrigin({lat:position.coords.latitude, lng:position.coords.longitude})
              },
              () => null
            );
          }}
        >
          <img src="../../images/compass.svg" alt="compass" className = "compass"/>
        </button>
    </Fragment>
  );
}