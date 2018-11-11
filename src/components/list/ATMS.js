/*eslint-disable*/;
import React,{Component} from 'react';
import { ListGroup, Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import { v4 } from 'uuid';
import './style.css';

const ATMS = (props) => {
  console.log('This is the props of ATM component',props.adat)
  return (
    <ListGroup>
    {props.adat.map((oneBank, index) => {
      const geo = oneBank.datas.Location.PostalAddress.GeoLocation.GeographicCoordinates;
      const address = oneBank.datas.Location.PostalAddress.AddressLine;
      const { PostCode, StreetName } = oneBank.datas.Location.PostalAddress;
      const atmServices = oneBank.datas.ATMServices.map(service => <li key={v4()}>{service}</li>);
      const isHidden = oneBank.display ? 'hidden' : '';
      const isAddress = address ? `${address} - ${StreetName}` : `${StreetName}`;
      return (
        <Card key={oneBank.id} onClick={() => props.showDetails(oneBank.id)}>
          {/* <CardBody> */}
            <CardTitle>{index + 1} {isAddress} </CardTitle>
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
        </Card>
      );
    },
    )}
  </ListGroup>
    )
}

export default ATMS;

