import React from 'react';
import './style.css';

const List = (props) => {
  // https://maps.google.com/?q=<lat>,<lng>
  /* <a href="https://maps.google.com/?q=${longitude},${latitude}"></a> */
  /* console.log( props,props[1].cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude)} */
  return (
    <div className="resultList">
      
       {  props.closestATM.map((elem,i) => {
           return (<li>{i}</li>)
           })
        
       }
    </div> 
  )
}

export default List