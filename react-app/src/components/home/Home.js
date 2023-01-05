import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Mainfeed from '../mainfeed/Mainfeed';
import Sidebar from '../sidebar/Sidebar';
import './Home.css';

function Home() {
  return (
    <div id='homeWrapper'>
      <Sidebar />
      <Mainfeed />
    </div>
  )
}

export default Home;
