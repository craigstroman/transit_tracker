import React, { useLayoutEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Marker, InfoWindowF } from '@react-google-maps/api';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { selectBusPositionState, getBusPositionsAsync } from './busMarkersSlice';

export const BusMarkers: React.FC = () => {
  interface ISelected {
    VehicleID: string;
  }
  interface ILocation {
    lat: any;
    lng: any;
  }

  const dispatch = useAppDispatch();
  const { mode, agency, route, map } = useParams();
  const busPositionsState = useAppSelector(selectBusPositionState);
  const [repeater, setRepeater] = useState(0);
  const [selected, setSelected] = useState<ISelected>({
    VehicleID: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<ILocation>({
    lat: 0,
    lng: 0,
  });

  const handleMarker = (VehicleID: string, lat: any, lng: any) => {
    setSelected({ VehicleID });
    setSelectedLocation({
      lat,
      lng,
    });
  };

  const handleInfoWindow = () => {
    setSelected({ VehicleID: '' });
    setSelectedLocation({
      lat: 0,
      lng: 0,
    });
  };

  useLayoutEffect(() => {
    if (agency && mode && route && map) {
      const getBusPositions = async () => {
        await dispatch(getBusPositionsAsync({ agency, mode, route }));
      };

      getBusPositions();

      setTimeout(() => {
        setRepeater((prevState) => prevState + 1);
      }, 20000);
    }
  }, [agency, mode, route, map, repeater]);

  if (
    busPositionsState.status === 'success' &&
    busPositionsState.value &&
    busPositionsState.value.length >= 1
  ) {
    return (
      <Fragment>
        {busPositionsState.value.map((el) => {
          const position = {
            lat: el.Lat,
            lng: el.Lon,
          };

          return (
            <Marker
              key={el.VehicleID}
              position={position}
              onClick={() => handleMarker(el.VehicleID, el.Lat, el.Lon)}
            >
              {selected.VehicleID === el.VehicleID && (
                <InfoWindowF position={selectedLocation} onCloseClick={() => handleInfoWindow}>
                  <div className="info-window">
                    {el.RouteId} - {el.DirectionText} - {el.TripHeadSign}
                  </div>
                </InfoWindowF>
              )}
            </Marker>
          );
        })}
      </Fragment>
    );
  } else {
    return <Fragment />;
  }
};
