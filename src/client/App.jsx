import React, { useEffect, useMemo, useState } from "react";
import ButtonDate from "./components/ButtonDate";
import moment from "moment";
import {
  GoogleMap,
  OverlayView,
  useLoadScript,
  Marker,
  Data,
} from "@react-google-maps/api";
import "./app.css";
import MapMarkerPin from "./components/MapMarkerPin";
import Title from "./components/Title";

const DEFAULT_CENTER = {
  lat: -32.9269165,
  lng: 151.7607144,
};

const App = () => {
  const [trips, setTrips] = useState({});
  const [titleDate, setTitleDate] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [mapInstance, setMapInstance] = useState(null);
  const [tripDates, setTripDates] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmN5Vrpbo-LJHnYFYtBJTb-Qe6k6h6hxc",
  });

  const onMapLoad = (map) => {
    setMapInstance(map);
    // added a maxZoom becuase the bounding useEffect would zoom in too much to the tripDate on Feb28
    map.setOptions({ maxZoom: 17 });
  };

  useEffect(() => {
    fetch("/api/getTrips")
      .then((res) => res.json())
      .then((res) => {
        let allTrips = res.trips;
        let datesOfTrips = [];
        allTrips.forEach((trip) => {
          let date = new Date(trip.startTime).toDateString();
          datesOfTrips.push(date);
        });
        // set does not allow duplicates
        let uniqDates = [...new Set(datesOfTrips)];
        setTripDates(uniqDates);
        setTrips(allTrips);
      });
  }, []);

  function handleDisplayTitle(date) {
    const filteredTrip = trips.filter((trip) => {
      return (
        // the slice gets rid of the year so it can be compared to date
        new Date(trip.startTime).toDateString().slice(0, 10) === date &&
        // filters out the empty array stops
        trip.stops.length > 0
      );
    });
    console.log(filteredTrip);
    setSelectedDate(filteredTrip);
    setTitleDate(date);
  }

  // bounds map within markers
  useEffect(() => {
    if (selectedDate && mapInstance) {
      const bounds = new google.maps.LatLngBounds();

      selectedDate.map((date) =>
        date.stops.forEach((stop) => {
          console.log(stop);
          bounds.extend({
            lat: stop.address.latitude,
            lng: stop.address.longitude,
          });
        })
      );
      mapInstance.fitBounds(bounds);
      // Pans the map by the minimum amount necessary to contain the given LatLngBounds
      mapInstance.panToBounds(bounds);
    }
    // re-render the useEffect using the dates in state and the mapInstance
  }, [selectedDate, mapInstance]);

  return (
    <div className="app-container">
      {isLoaded && (
        <GoogleMap
          center={DEFAULT_CENTER}
          onLoad={onMapLoad}
          mapContainerStyle={{
            height: "400px",
            width: "800px",
            display: "inline-block",
          }}
          zoom={16}
        >
          {selectedDate
            ? selectedDate.map((date) =>
                date.stops.map((stop) => {
                  return (
                    <OverlayView
                      key={stop.id}
                      position={{
                        lat: stop.address.latitude,
                        lng: stop.address.longitude,
                      }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <MapMarkerPin type={stop.type} />
                    </OverlayView>
                  );
                })
              )
            : null}
        </GoogleMap>
      )}
      <Title titleDate={titleDate} selectedDate={selectedDate} />
      {tripDates
        ? tripDates.map((date) => (
            <ButtonDate
              handleDisplayTitle={handleDisplayTitle}
              key={date}
              date={date}
            />
          ))
        : null}
    </div>
  );
};

export default App;
