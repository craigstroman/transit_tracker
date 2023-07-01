import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IAgencies } from './agencyTypes';
import { selectAgencyState, getAgenciesAsync } from './agencySlice';
import './Agency.scss';

export const Agency: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const agencyState = useAppSelector(selectAgencyState);
  const [selectedOption, setSelectedOption] = useState<IAgencies>();

  const handleChange = (e: any) => {
    const { value, label } = e;

    setSelectedOption({ label, value });
  };

  useEffect(() => {
    async function getAgencies() {
      await dispatch(getAgenciesAsync());
    }

    getAgencies();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${selectedOption.value}`);
    }
  }, [selectedOption]);

  return (
    <div className="agency-container">
      <label htmlFor="agency-select">Select an agency:</label>
      <Select
        options={agencyState.value}
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};
