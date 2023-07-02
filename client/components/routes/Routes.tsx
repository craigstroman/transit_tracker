import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IRoutes } from './routesTypes';
import { selectRoutesState, getRoutesAsync } from './routesSlice';
import './Routes.scss';

export const Routes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route } = useParams();
  const routeState = useAppSelector(selectRoutesState);
  const [selectedOption, setSelectedOption] = useState<IRoutes>();

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

    if (agency && mode && route) {
      if (!selectedOption) {
        setSelectedOption({
          label: route,
          value: route,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${agency}/mode/${mode}/routes/${selectedOption.value}`);
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
