/*eslint-disable */
/* eslint-disable react/prop-types */
import React from 'react';
import { ListGroup, Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import { v4 } from 'uuid';
import './style.css';

const List = props => (
  <ListGroup>
    {props.closestATM.map((elem, index) => {
      const geo = elem.cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates;
      const address = elem.cashpoint.Location.PostalAddress.AddressLine;
      const { PostCode, StreetName } = elem.cashpoint.Location.PostalAddress;
      const atmServices = elem.cashpoint.ATMServices.map(service => <li key={v4()}>{service}</li>);
      const isHidden = elem.display ? 'hidden' : '';
      const isAddress = address ? `${address} - ${StreetName}` : `${StreetName}`;
      return (
        <Card key={elem.id} onClick={() => props.showDetails(elem.id)}>
          <CardBody>
            <CardTitle>{isAddress}</CardTitle>
            <CardSubtitle className={isHidden}>{PostCode}</CardSubtitle>
            <CardText className={isHidden}>
            Services{atmServices}
              <Button
                color="danger"
                href={`https://maps.google.com/maps?q=${geo.Latitude},${geo.Longitude}`}
              >
                Show it on Google maps
              </Button>
            </CardText>
          </CardBody>
        </Card>
      );
    },
    )}
  </ListGroup>
);

export default List;
