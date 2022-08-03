import React from 'react';
import { usePocCollection } from '../../context/toolProvider';
import { NFTSection } from '../../components';
import './index.css';

const MainPage = () => {
  return (
    <div className="mainPage-container">
      <NFTSection />
    </div>
  );
};

export default MainPage;
