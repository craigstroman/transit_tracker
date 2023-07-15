import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { IDirection } from './directionsTypes';
import { selectDirectionState, getDirectionsAsync } from './directionsSlice';
import './Direction.scss';

export const Directions: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { agency, mode, route, direction } = useParams();
  const directionState = useAppSelector(selectDirectionState);
  const [selectedOption, setSelectedOption] = useState<IDirection>();
  const [chosenDirection, setChosenDirection] = useState<string>('');
  let selectedDirection = null;

  const handleChange = (e: any) => {
    const { label, value } = e;

    setSelectedOption({
      label,
      value,
    });
  };

  useEffect(() => {
    if (agency && mode && route) {
      const getDirections = async () => {
        await dispatch(getDirectionsAsync({ agency, mode, route }));
      };

      getDirections();
    }
  }, [agency, mode, route]);

  useEffect(() => {
    if (direction) {
      setChosenDirection(direction);
    }

    if (directionState.value.length > 1 && agency && mode && chosenDirection) {
      selectedDirection = directionState.value.find((el) => el.value === chosenDirection);
      if (selectedDirection) {
        setSelectedOption(selectedDirection);
      }
    }
  }, [directionState.value, agency, mode, route]);

  useEffect(() => {
    if (selectedOption) {
      navigate(`/agency/${agency}/mode/${mode}/routes/${route}/direction/${selectedOption.value}`);
    }
  }, [selectedOption]);

  return (
    <div
      className="direction-container"
      style={agency && mode && route ? { display: 'block' } : { display: 'none' }}
    >
      <label htmlFor="direction-select">Select a direction:</label>
      <Select
        name="direction-select"
        id="direction-select"
        className="direction-select"
        value={selectedOption}
        onChange={handleChange}
        options={directionState.value}
      />
    </div>
  );
};
