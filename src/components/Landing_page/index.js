/* eslint-disable */

import React from 'react';
import { Heading } from 'rebass';
import { Hero } from 'react-landing-page';
import './style.css';
import { geoPropTypes } from 'react-geolocated';

const Landing = (props) =>
  (
    <Hero className="landing">
      <Heading>Bank Locator</Heading>
      <button onClick={props.next}>Next</button>
    </Hero>
  );
export default Landing;
