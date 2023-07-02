import React from 'react';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';

export const Options: React.FC = () => {
  return (
    <div className="row_large">
      <div>
        <Agency />
      </div>
      <div>
        <Mode />
      </div>
    </div>
  );
};
