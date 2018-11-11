/*eslint-disable*/;

import React, { Component } from 'react';
import { ListGroup, Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { v4 } from 'uuid';
import './style.css';

const BranchList = (props) => {
  console.log('This is the props of ATM component',props)
  return (
    <ListGroup>
      {props.bankData.map((oneBank, index) => {
        const geo = oneBank.datas.PostalAddress.GeoLocation.GeographicCoordinates;
        const { PostCode ,StreetName, BuildingNumber} = oneBank.datas.PostalAddress;
        const isHidden = oneBank.display ? 'hidden' : '';
        const photo = oneBank.datas.Photo;
        const availability = oneBank.datas.Availability.StandardAvailability.Day;
        const day = availability.map(day =>
            <li>{day.Name} - {day.OpeningHours[0].OpeningTime.slice(0,5)} - {day.OpeningHours[0].ClosingTime.slice(0,5)}</li>
          )
        return (
          <Card key={oneBank.id} onClick={() => props.showDetails(oneBank.id)}>
            <CardBody>
              <CardTitle>{BuildingNumber} - {StreetName}</CardTitle>
              <CardSubtitle>{PostCode}</CardSubtitle>
            </CardBody>
            <CardBody className={isHidden}>
            <CardImg top width="100%" src={photo} alt="Card image cap" />
              <CardSubtitle>Opening Times</CardSubtitle>
              <ul className="opening-times">
              {day}
              </ul>
              <CardText>
                <Button color="danger" href={`https://maps.google.com/maps?q=${geo.Latitude},${geo.Longitude}`}>
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
};

export default BranchList;
