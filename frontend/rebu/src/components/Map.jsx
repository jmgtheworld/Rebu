import React, {Fragment} from "react";
import Geocode from "react-geocode";
import { Spinner } from 'react-bootstrap';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "../styles/map.css";
import mapStyles from "../styles/mapStyles"


const libraries = ["places"];

const mapContainerStyle = {
  height: "60vh",
  width: "50vw",
  marginLeft: "25%"
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 43.6532,
  lng: -79.3832,
};

Geocode.setApiKey("AIzaSyCNm0iMh4id4JyYT4P41jH5qRcv2G13r8g");

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB80M_S2VXZAh7-VtYLg1eYAjOVcauxn2c",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [startAddress, setstartAddress] = React.useState("");
 
  const onMapClick = React.useCallback((e) => {
    setMarkers(() => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const setMarker = React.useCallback((lat, lng)=> {
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
  }, []);

  const getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setstartAddress(address)
        console.log(startAddress)
      },
      error => {
        console.error(error);
      }
    );
  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
    getAddress(lat, lng)
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return <Spinner animation="border" variant="secondary" />;

  return (
    <div>

      <div className = "searchArea">
        <Locate panTo={panTo} />
        <SearchStart panTo={panTo} startAddress = {startAddress} />
      </div>
      <div className = "destinationArea"> 
        <SearchDestination panTo={panTo} /> 
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
      </GoogleMap>
      {loading && <Spinner animation="border" variant="secondary" className = "loading"/>}
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <Fragment>
        <button
          className="locate"
          onClick={() => {
      
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log(position)
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
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

function SearchStart({ panTo } ) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value= {value} 
          onChange={handleInput}
          disabled={!ready}
          placeholder= "Search your location"
          className = "searchBar" 
        />
        <ComboboxPopover className = "comboboxPop">
          <ComboboxList className = "comboboxList">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} className = "comboboxOption"/>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}


function SearchDestination({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder= "Where to?"
          className = "searchBar" 
        />
        <ComboboxPopover className = "comboboxPop">
          <ComboboxList className = "comboboxList">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} className = "comboboxOption"/>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}