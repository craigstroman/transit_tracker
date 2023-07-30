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
  const { agency, mode, route, stop } = useParams();
  const stopsState = useAppSelector(selectStopsState);
  const [selectedOption, setSelectedOption] = useState<IStop>();
  let stopId: string | null = null;
  let selectedStop: IStop = {
    label: '',
    value: '',
  };

  const handleChange = (e: any) => {
    const { label, value } = e;

    setSelectedOption({
      label,
      value,
    });
  };

  useEffect(() => {
    if (agency && mode && route) {
      const getStops = async () => {
        await dispatch(getStopsAsync({ agency, mode, route }));
      };

      getStops();
    }
  }, [agency, mode, route]);

  useEffect(() => {
    if (stop !== undefined) {
      stopId = stop;
    }
  }, [stop]);

  useEffect(() => {
    // TODO: Figure out how to get stop to load on page refresh when it's selected
    if (stop === undefined && mode && agency && route && stop && stopsState.value.length >= 1) {
      const chosenStop = stopsState.value.find((el) => el.value === stop);

      if (chosenStop) {
        selectedStop = chosenStop;
      }

      if (selectedStop.label.length >= 1) {
        setSelectedOption(selectedStop);
      }
    }
  }, [stop, agency, mode, route, stopsState.value]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/mode/${mode}/agency/${agency}/routes/${route}/stops/${selectedOption.value}/predictions`);
    }
  }, [selectedOption]);

  return (
    <div
      className="stops-container"
      style={agency && mode && route ? { display: 'block' } : { display: 'none' }}
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
