import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select, { ValueType } from 'react-select';
import { useAppSelector } from '../../store/store';
import { IMode } from './modeTypes';
import { selectModeState } from './modeSlice';
import './Mode.scss';

export const Mode: React.FC = () => {
  const navigate = useNavigate();
  const { agency } = useParams();
  const modeState = useAppSelector(selectModeState);
  const [selectedOption, setSelectedOption] = useState<ValueType<IMode, false>>();

  const handleChange = (e: any) => {
    const { target } = e;
    const { value } = target;

    setSelectedOption(value);
  };

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${agency}/mode/${selectedOption}/routes`);
    }
  }, [selectedOption]);

  return (
    <div className="mode-container">
      <label htmlFor="mode-select">Select a mode:</label>
      <Select
        name="mode-select"
        id="mode-select"
        value={selectedOption}
        onChange={handleChange}
        options={modeState.value}
      />
    </div>
  );
};
