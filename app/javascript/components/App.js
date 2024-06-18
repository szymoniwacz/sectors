import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [name, setName] = useState('');
  const [sectorIds, setSectorIds] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/sectors')
      .then(response => setSectors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/v1/users', { name, sector_ids: sectorIds, agree_to_terms: agreeToTerms })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Sector Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSectors">
              <Form.Label>Sectors</Form.Label>
              <Form.Control
                as="select"
                multiple
                size="5"
                value={sectorIds}
                onChange={(e) => setSectorIds([...e.target.selectedOptions].map(o => o.value))}
              >
                {sectors.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAgree">
              <Form.Check
                type="checkbox"
                label="Agree to terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
