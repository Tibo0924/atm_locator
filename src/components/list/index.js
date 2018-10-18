import React from 'react';
import './style.css';
import { ListGroup ,Button } from 'reactstrap/';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, } from 'reactstrap';


const List = (props) => {
	console.log(props)
  return (
    <ListGroup>
			{props.closestATM.map((elem,i) => {
				const geo = elem.cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates;
				const address = elem.cashpoint.Location.PostalAddress.AddressLine;
				const {PostCode,StreetName} = elem.cashpoint.Location.PostalAddress;
				
				return (
					<Card>
						<CardBody color="info" key={i} > 
							<CardTitle>{address} - {StreetName}</CardTitle>
							<CardSubtitle>{PostCode}</CardSubtitle>
							<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
							<Button  color="danger"href={`https://maps.google.com/maps?q=${geo.Latitude},${geo.Longitude}`}>ATM location</Button>
						</CardBody>
					</Card>	
				)}
			)}
    </ListGroup> 
  )
}
export default List