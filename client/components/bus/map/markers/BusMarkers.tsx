import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { selectBusPositionState, getBusPositionsAsync } from './busMarkersSlice';
import './BusMarkers.scss';

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
  const [selected, setSelected] = useState<ISelected>({
    VehicleID: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<ILocation>({
    lat: 0,
    lng: 0,
  });

  const getBusPositions = useCallback(async () => {
    if (agency && mode && route && map) {
      await dispatch(getBusPositionsAsync({ agency, mode, route }));
    }
  }, [agency, mode, route, map]);

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

  useEffect(() => {
    if (agency && mode && route && map) {
      getBusPositions();
    }
  }, [agency, mode, route, map]);

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
                <InfoWindow position={selectedLocation} onCloseClick={() => handleInfoWindow}>
                  <div className="info-window">
                    {el.RouteId} - {el.DirectionText} - {el.TripHeadSign}
                  </div>
                </InfoWindow>
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
