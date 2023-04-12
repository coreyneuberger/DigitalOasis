import React from 'react';
import { spinningcircles } from '../assets';

const Loader = () => (
  <div role="status">
    <img src={spinningcircles} />
  </div>
);

export default Loader;