import React from 'react';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import './Options.scss';

export const Options: React.FC = () => {
  return (
    <div className="row_small">
      <div>
        <Agency />
      </div>
      <div>
        <Mode />
      </div>
    </div>
  );
};
