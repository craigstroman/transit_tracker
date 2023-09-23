import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { selectPredictionsState, getPredictionsAsync } from './predictionsSlice';
import './Predictions.scss';

export const BusPredictions: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route, stop, direction } = useParams();
  const predictionsState = useAppSelector(selectPredictionsState);
  const [repeater, setRepeater] = useState(0);

  const showMap = () => {
    navigate(
      `/mode/${mode}/agency/${agency}/routes/${route}/direction/${direction}/stops/${stop}/map/showMap`,
    );
  };

  useEffect(() => {
    if (agency && mode && route && stop) {
      const getPredictions = async () => {
        await dispatch(getPredictionsAsync({ agency, mode, route, stop }));
      };

      getPredictions();

      setTimeout(() => {
        setRepeater((prevState) => prevState + 1);
      }, 20000);
    }
  }, [agency, mode, route, stop, repeater]);

  return (
    <div className="predictions-container">
      <header>
        <h1 className="predictions-title">Predictions</h1>
        <hr />
        <button type="button" className="show-map-button" onClick={() => showMap()}>
          Show Map
        </button>
        <hr />
      </header>
      <div className="predictions-info">
        Predictions for route {route}
        <hr />
      </div>
      {predictionsState.value.selectedRoute &&
        predictionsState.value.selectedRoute.length >= 1 &&
        predictionsState.value.selectedRoute.map((el, i) => {
          if ((el.Minutes === 1 || el.Minutes === 0) && i === 0) {
            return (
              <div key={el.VehicleID}>
                <b>Arriving</b>
              </div>
            );
          } else if (el.Minutes > 1) {
            return (
              <div key={el.VehicleID}>
                <b>{el.Minutes} minutes</b>
              </div>
            );
          }
        })}
      {predictionsState.value.selectedRoute && predictionsState.value.selectedRoute.length === 0 && (
        <div>
          <b>Currently no predictions for the selected route.</b>
        </div>
      )}
      {predictionsState.value.otherRoutes && predictionsState.value.otherRoutes.length >= 1 && (
        <div>
          <hr />
          Also at this stop
          <hr />
          {predictionsState.value.otherRoutes.map((el) => (
            <div key={el.VehicleID}>
              <b>{el.Minutes} min</b> Route {el.RouteID}, {el.DirectionText}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
