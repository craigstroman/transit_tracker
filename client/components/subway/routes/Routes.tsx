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
  let selectedRoute = null;

  const handleChange = (e: any) => {
    const { value, label } = e;

    setSelectedOption({ label, value });
  };

  useEffect(() => {
    async function getRoutes() {
      if (agency && mode) {
        await dispatch(getRoutesAsync({ agency, mode }));
      }
    }

    getRoutes();
  }, [agency, mode]);

  useEffect(() => {
    if (route) {
      setChosenRoute(route);
    }
    if (routeState.value.length > 1 && agency && mode && chosenRoute) {
      selectedRoute = routeState.value.find((el) => el.value === chosenRoute);
      if (selectedRoute) {
        setSelectedOption(selectedRoute);
      }
    }
  }, [routeState.value, agency, mode]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/mode/${mode}/agency/${agency}/routes/${selectedOption.value}`);
    }
  }, [selectedOption]);

  return (
    <div className="routes-container" style={agency && mode ? { display: 'block' } : { display: 'none' }}>
      <label htmlFor="routes-select">Select a route:</label>
      <Select
        options={routeState.value}
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};
