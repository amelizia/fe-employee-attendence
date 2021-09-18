// import React from "react";
// // import "./styles.css";
// // import axios from "axios";
// import Geocode from "react-geocode";

// const API_Key = "AIzaSyAWa7-RTKOR7BulmJ1PWmDaJ9r2ZB8UqAs";

// export default class Address extends React.Component {
//   state = {
//     address: {
//       formatted_address: "",
//       latitude: "",
//       longitude: ""
//     }
//   };
//   successPosition = (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     this.setState({ address: { ...this.state.address, latitude, longitude } });

//     // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
//     Geocode.setApiKey(API_Key);

//     // set response language. Defaults to english.
//     Geocode.setLanguage("en");

//     // set response region. Its optional.
//     // A Geocoding request with region=es (Spain) will return the Spanish city.
//     Geocode.setRegion("es");

//     // Enable or disable logs. Its optional.
//     Geocode.enableDebug();

//     // Get address from latitude & longitude.
//     Geocode.fromLatLng(latitude, longitude).then(
//       (response) => {
//         const formatted_address = response.results[0].formatted_address;
//         this.setState({
//           address: { ...this.state.address, formatted_address }
//         });
//         // this.props.handleSelect(this.state.address);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };

//   deniedPosition = (error) => {
//     alert(
//       "You denied to location permission,\nAllow the permission from browser's settings or add you address manually."
//     );
//   };

//   getCurrentLoaction = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => this.successPosition(pos),
//         (err) => this.deniedPosition(err)
//       );
//     } else {
//       alert("Your Browser doesn't support location service !");
//     }
//   };
//   render() {
//     const { address, latlng } = this.state;
//     return (
//       <div className="Address">
//         <h1>Get your location</h1>
//         <h2>{address.formatted_address}</h2>
//         <h2>
//           {address.latitude},{address.longitude}
//         </h2>
//         <button onClick={() => this.getCurrentLoaction()}>
//           Click Here To Get Your Location
//         </button>
//       </div>
//     );
//   }
// }
import React, { useState } from 'react';
import Geocode from "react-geocode";

  const Address = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [Add, setAdd] = useState(null);
  const [Tmpstmp, setTmpstmp] = useState (null);
  const [status, setStatus] = useState(null);

  const API_Key = "AIzaSyAWa7-RTKOR7BulmJ1PWmDaJ9r2ZB8UqAs";

      // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
      Geocode.setApiKey(API_Key);
      // ROOFTOP param returns the most accurate result.
      Geocode.setLocationType("ROOFTOP");
      // set response language. Defaults to english.
      Geocode.setLanguage("en");
      // Enable or disable logs. Its optional.
      Geocode.enableDebug();


  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      setTmpstmp(
        new Date().toLocaleDateString("zh-Hans-CN", {
          year: "numeric", 
          month: "2-digit",
          day: "2-digit"
      }) .replace(/\//g, '-')+ " " + 
      new Date().toLocaleTimeString("en-GB",{}));

      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });

      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          setAdd(response.results[0].formatted_address);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  return (
    <div className="App">
      <button onClick={getLocation}>Your current location</button>
      <p>{status}</p>
      {lat && <a>{lat.toFixed(7)}</a>}
      {lng && <a>, {lng.toFixed(7)}</a>}
      {Add && <p>{Add}</p>}
      {Tmpstmp && <p>{Tmpstmp}</p>}
    </div>
  );
}

export default Address;

