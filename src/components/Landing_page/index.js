import React from 'react';
import { Heading } from 'rebass';
import { Hero, ScrollDownIndicator } from 'react-landing-page';
import { Link } from 'react-router-dom';
import './style.css';

const Landing = () =>
  (
    <Hero>
      <Heading>Basic Hero</Heading>
      <ScrollDownIndicator />
      <Link to="/app">App</Link>
    </Hero>
  );
export default Landing;
