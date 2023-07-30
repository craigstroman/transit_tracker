import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IAgencies } from './agencyTypes';
import { selectAgencyState, getAgenciesAsync } from './agencySlice';
import './Agency.scss';

export const Agency: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode } = useParams();
  const agencyState = useAppSelector(selectAgencyState);
  const [selectedOption, setSelectedOption] = useState<IAgencies>();
  let selectedAgency: IAgencies = {
    label: '',
    value: '',
  };

  const handleChange = (e: any) => {
    const { value, label } = e;

    setSelectedOption({ label, value });
  };

  useEffect(() => {
    const getAgencies = async () => {
      if (mode) {
        await dispatch(getAgenciesAsync(mode));
      }
    };

    getAgencies();
  }, [mode]);

  useEffect(() => {
    if (agency && mode && agencyState.value.length >= 1) {
      const chosenAgency = agencyState.value.find((el) => el.value === agency);

      if (chosenAgency) {
        selectedAgency = chosenAgency;
      }
    }
    if (selectedAgency.label.length > 1) {
      setSelectedOption(selectedAgency);
    }
  }, [agencyState.value, agency, mode]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`mode/${mode}/agency/${selectedOption.value}/routes`);
    }
  }, [selectedOption]);

  return (
    <div className="agency-container" style={mode ? { display: 'inline-block' } : { display: 'none' }}>
      <label htmlFor="agency-select">Select an agency:</label>
      <Select
        name="agency-select"
        id="agency-select"
        className="agency-select"
        options={agencyState.value}
        value={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};
