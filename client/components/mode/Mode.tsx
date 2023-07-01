import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IMode } from './modeTypes';
import { selectModeState, getModesAsync } from './modeSlice';
import './Mode.scss';

export const Mode: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency } = useParams();
  const modeState = useAppSelector(selectModeState);
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (e: any) => {
    const { target } = e;
    const { value } = target;

    setSelectedOption(value);
  };

  useEffect(() => {
    if (agency) {
      const getModes = async () => {
        await dispatch(getModesAsync(agency));
      };

      getModes();
    }
  }, [agency]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${agency}/mode/${selectedOption}/routes`);
    }
  }, [selectedOption]);

  return (
    <div className="mode-container" style={agency ? { display: 'inline-block' } : { display: 'none' }}>
      <label htmlFor="mode-select">Select a mode:</label>
      <Select
        name="mode-select"
        id="mode-select"
        className="mode-select"
        value={selectedOption}
        onChange={handleChange}
        options={modeState.value}
      />
    </div>
  );
};
