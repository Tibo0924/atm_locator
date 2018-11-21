/*eslint-disable */
/* eslint-disable react/prop-types */
import React from 'react';
import ATMS from './ATMS';
import BranchList from './Branches'
import './style.css';

const List = (props) => {
  console.log('List component props', props);
  return (
      props.checked  ?
        <BranchList
          bankData={props.closestBranches}
          showDetails={props.showDetails}
        />
      :
      <ATMS adat={props.closestATM}
          showDetails={props.showDetails}
      />
  )
}
export default List;
