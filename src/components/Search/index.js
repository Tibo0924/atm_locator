import React from 'react';
import { InputGroup, InputGroupAddon, Input, Form, FormGroup, Label } from 'reactstrap';
import './style.css';

const Search = () => (
  <div className="Searchfields">
    <Form>
      <InputGroup>
        <Input placeholder="ZIP code" />
        <InputGroupAddon addonType="append">Search by ZIP code</InputGroupAddon>
      </InputGroup>
      <FormGroup>
        <Label for="exampleSelectMulti">Select Multiple</Label>
        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
          <option>TSB</option>
          <option>Barclays</option>
          <option>Lloyds</option>
          <option>HSBC</option>
          <option>Natwide</option>
        </Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Wheelchair acces
        </Label>
      </FormGroup>
    </Form>
  </div>
);

export default Search;
