import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { IRoutes } from './routesTypes';
import { selectRoutesState, getRoutesAsync } from './routesSlice';

export const SubwayRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route } = useParams();
  const routeState = useAppSelector(selectRoutesState);
  const [selectedOption, setSelectedOption] = useState<IRoutes>();
  const [chosenRoute, setChosenRoute] = useState<string>('');

  console.log('routeState: ', routeState);

  useEffect(() => {
    async function getRoutes() {
      if (agency && mode) {
        await dispatch(getRoutesAsync({ agency, mode }));
      }
    }

    getRoutes();
  }, [agency, mode]);
  return (
    <div className="routes-container" style={agency && mode ? { display: 'block' } : { display: 'none' }}>
      <label htmlFor="routes-select">Select a route:</label>
      <Select options={routeState.value} value={selectedOption} defaultValue={selectedOption} />
    </div>
  );
};
