import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { IDirections } from './directionsTypes';
import { selectDirectionsState, getDirectionsAsync } from './directionsSlice';

export const SubwayDirections: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route, station } = useParams();
  const directionsState = useAppSelector(selectDirectionsState);
  const [selectedOption, setSelectedOption] = useState<IDirections>();
  const [chosenDirection, setChosenDirection] = useState<string>('');
  let selectedDirection = null;

  const handleChange = (e: any) => {
    const { value, label } = e;

    setSelectedOption({ label, value });
  };

  useEffect(() => {
    async function getDirections() {
      if (agency && mode && route && station) {
        await dispatch(getDirectionsAsync({ agency, mode, route, station }));
      }
    }

    getDirections();
  }, [agency, mode, route, station]);

  useEffect(() => {
    if (selectedOption) {
      navigate(
        `/mode/${mode}/agency/${agency}/routes/${route}/station/${station}/direction/${selectedOption.label.toLowerCase()}`,
      );
    }
  }, [selectedOption]);

  return (
    <div
      className="routes-container"
      style={agency && mode && route && station ? { display: 'block' } : { display: 'none' }}
    >
      <label htmlFor="routes-select">Select a direction:</label>
      <Select
        options={directionsState.value}
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};
