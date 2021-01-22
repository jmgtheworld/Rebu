import {Fragment} from 'react';
import {FaRegCompass} from "react-icons/fa";
 
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
          <FaRegCompass />
        </button>
    </Fragment>
  );
}