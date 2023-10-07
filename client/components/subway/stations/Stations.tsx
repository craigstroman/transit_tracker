import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { IStations } from './stationsTypes';
import { selectStationsState, getStationsAsync } from './stationsSlice';

export const SubwayStations: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route } = useParams();
  const stationsState = useAppSelector(selectStationsState);
  const [selectedOption, setSelectedOption] = useState<IStations>();
  const [chosenStation, setChosenStation] = useState<string>('');
  let selectedStation = null;

  const handleChange = (e: any) => {
    const { value, label } = e;

    setSelectedOption({ label, value });
  };

  useEffect(() => {
    async function getStations() {
      if (agency && mode && route) {
        await dispatch(getStationsAsync({ agency, mode, route }));
      }
    }

    getStations();
  }, [agency, mode, route]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/mode/${mode}/agency/${agency}/routes/${route}/station/$${selectedOption.value}`);
    }
  }, [selectedOption]);

  return (
    <div
      className="routes-container"
      style={agency && mode && route ? { display: 'block' } : { display: 'none' }}
    >
      <label htmlFor="routes-select">Select a station:</label>
      <Select
        options={stationsState.value}
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};
