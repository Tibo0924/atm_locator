import React from 'react';
import { Heading } from 'rebass';
import { Hero } from 'react-landing-page';
import { Link } from 'react-router-dom';
import './style.css';

const Landing = () =>
  (
    <Hero className="landing">
      <Heading> <span>Bank</span>Locator</Heading>
      <Link to="/app">Next</Link>
    </Hero>
  );
export default Landing;
