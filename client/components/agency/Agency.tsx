import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { ValueType } from 'react-select';
import { useAppSelector } from '../../store/store';
import { IAgencies } from './agencyTypes';
import { selectAgencyState } from './agencySlice';
import './Agency.scss';

export const Agency: React.FC = () => {
  const navigate = useNavigate();
  const agencyState = useAppSelector(selectAgencyState);
  const [selectedOption, setSelectedOption] = useState<ValueType<IAgencies, false>>();

  const handleChange = (e: any) => {
    const { target } = e;
    const { value } = target;

    setSelectedOption(value);
  };

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${selectedOption}`);
    }
  }, [selectedOption]);

  return (
    <div className="agency-container">
      <label htmlFor="agency-select">Select an agency:</label>
      <Select
        name="agency-select"
        value={selectedOption}
        onChange={(e) => handleChange(e)}
        options={agencyState.value}
      />
    </div>
  );
};
