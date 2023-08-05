import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { ICoords } from './mapTypes';
import { getCoordsAsync, selectCoordsState } from './mapSlice';

export const Map: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const coordsState = useAppSelector(selectCoordsState);
  const { agency, mode, route } = useParams();

  console.log('coordsState: ', coordsState);

  useEffect(() => {
    if (agency && mode && route) {
      const getCoords = async () => {
        await dispatch(getCoordsAsync({ agency, mode, route }));
      };

      getCoords();
    }
  }, [agency, mode, route]);

  return <div>Maps</div>;
};
