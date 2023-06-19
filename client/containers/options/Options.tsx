import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Agency } from '../../components/agency/Agency';
import { Mode } from '../../components/mode/Mode';
import './Options.scss';

const Options: React.FC = () => {
  return (
    <div className="options">
      <div className="options__row">
        <div className="options__row--col">
          <Routes>
            <Route path="/" element={<Agency />} />
          </Routes>
        </div>
        <div className="options__row--col">
          <Routes>
            <Route path="/agency/:agency" element={<Mode />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Options;
