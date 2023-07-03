import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IStop } from './stopsTypes';
import { selectStopsState, getStopsAsync } from './stopsSlice';
import './Stops.scss';

export const Stops: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route, direction } = useParams();
  const stopsState = useAppSelector(selectStopsState);
  const [selectedOption, setSelectedOption] = useState<IStop>();

  const handleChange = (e: any) => {
    const { label, value } = e;

    setSelectedOption({
      label,
      value,
    });
  };

  useEffect(() => {
    if (agency && mode && route && direction) {
      const getStops = async () => {
        await dispatch(getStopsAsync({ agency, mode, route, direction }));
      };

      getStops();
    }
  }, [agency, mode, route, direction]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${agency}/mode/${mode}/routes/${route}/direction/${selectedOption.value}`);
    }
  }, [selectedOption]);

  return (
    <div
      className="stops-container"
      style={agency && mode && route && direction ? { display: 'block' } : { display: 'none' }}
    >
      <label htmlFor="direction-select">Select a stop:</label>
      <Select
        name="stops-select"
        id="stops-select"
        className="stops-select"
        value={selectedOption}
        onChange={handleChange}
        options={stopsState.value}
      />
    </div>
  );
};
