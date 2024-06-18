import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const App = () => {
  const [name, setName] = useState('');
  const [sectorIds, setSectorIds] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/v1/sectors')
      .then(response => setSectors(response.data))
      .catch(error => console.error('Error fetching sectors:', error));

    axios.get('/api/v1/users/me')
      .then(response => {
        const user = response.data;
        if (user) {
          setName(user.name);
          setSectorIds(user.sector_ids);
          setAgreeToTerms(user.agree_to_terms);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/v1/users', { name, sector_ids: sectorIds, agree_to_terms: agreeToTerms })
      .then(response => {
        setMessage('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setMessage('Failed to submit form. Please try again.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Sector Form</h1>
          {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
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
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions);
                  setSectorIds(selectedOptions.map(option => parseInt(option.value)));
                }}
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
            <Button variant="primary" type="submit" block="true">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
