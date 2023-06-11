import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchAgency } from '../../actions/agency/agency-actions';
import './Agency.scss';

export const Agency: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');
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
        options={agencies}
      />
    </div>
  );
};
