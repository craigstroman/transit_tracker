import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { selectPredictionsState, getPredictionsAsync } from './predictionsSlice';
import './Predictions.scss';

export const SubwayPredictions: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route, station, direction } = useParams();
  const predictionsState = useAppSelector(selectPredictionsState);
  const [repeater, setRepeater] = useState(0);

  const showMap = () => {
    navigate(
      `/mode/${mode}/agency/${agency}/routes/${route}/direction/${direction}/stops/${stop}/map/showMap`,
    );
  };

  const routeName = (route: string) => {
    let routeName: string = '';
    switch (route) {
      case 'SV':
        routeName = 'Silver Line';
        break;
      case 'BL':
        routeName = 'Blue Line';
        break;
      case 'GR':
        routeName = 'Green Line';
        break;
      case 'OR':
        routeName = 'Orange Line';
        break;
      case 'RD':
        routeName = 'Red';
        break;
      case 'YL':
        routeName = 'Yellow';
        break;
      default:
        routeName = '';
        break;
    }

    return routeName;
  };

  useEffect(() => {
    if (agency && mode && route && station && direction) {
      const getPredictions = async () => {
        await dispatch(getPredictionsAsync({ agency, mode, route, station, direction }));
      };

      getPredictions();

      setTimeout(() => {
        setRepeater((prevState) => prevState + 1);
      }, 20000);
    }
  }, [agency, mode, route, station, direction, repeater]);

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
        Predictions for {routeName(route || '')} route
        {predictionsState.value.length >= 1 &&
          ` from ${predictionsState.value[0].LocationName} to ${predictionsState.value[0].DestinationName}`}
        <hr />
      </div>
      {predictionsState.value &&
        predictionsState.value.length >= 1 &&
        predictionsState.value.map((el, i) => {
          if (el.Min === 'ARR') {
            return (
              <div key={`${el.Car}-${Math.random() * 10}`}>
                <b>Arriving</b>
              </div>
            );
          } else if (el.Min === 'BRD') {
            return (
              <div key={`${el.Car}-${Math.random() * 10}`}>
                <b>Boarding</b>
              </div>
            );
          } else if (el.Min >= '1') {
            return (
              <div key={`${el.Car}-${Math.random() * 10}`}>
                <b>{el.Min} minute(s)</b>
              </div>
            );
          }
        })}
    </div>
  );
};
