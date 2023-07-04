import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { selectPredictionsState, getPredictionsAsync } from './predictionsSlice';
import './Predictions.scss';

export const Predictions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { agency, mode, route, direction, stop } = useParams();
  const predictionsState = useAppSelector(selectPredictionsState);
  const [repeater, setRepeater] = useState(0);

  useEffect(() => {
    if (agency && mode && route && direction && stop) {
      const getPredictions = async () => {
        await dispatch(getPredictionsAsync({ agency, mode, route, direction, stop }));
      };

      getPredictions();

      setTimeout(() => {
        setRepeater((prevState) => prevState + 1);
      }, 20000);
    }
  }, [agency, mode, route, direction, stop, repeater]);

  return (
    <div
      className="predictions-container"
      style={agency && mode && route && direction && stop ? { display: 'block' } : { display: 'none' }}
    >
      <header>
        <h1 className="predictions-title">Predictions</h1>
      </header>
      <div className="predictions-info">
        Predictions for route {route} to
        {predictionsState.value.selectedRoute.length >= 1
          ? ` ${predictionsState.value.selectedRoute[0].DirectionText} `
          : ` ${direction} `}
        at stop {stop}
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
