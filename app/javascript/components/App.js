import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import './App.css';

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

  const renderOptions = (sectors, parentId = null, level = 0) => {
    return sectors
      .filter(sector => sector.parent_id === parentId)
      .map(sector => (
        <React.Fragment key={sector.id}>
          <option value={sector.id}>
            {Array(level).fill('\u00A0\u00A0\u00A0\u00A0').join('')}{sector.name}
          </option>
          {renderOptions(sectors, sector.id, level + 1)}
        </React.Fragment>
      ));
  };

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
      <Row className="justify-content-md-center mt-5">
        <Col md="8">
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Sector Form</h1>
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
                <Form.Group controlId="formSectors" className="mt-3">
                  <Form.Label>Sectors</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    className="large-select"
                    value={sectorIds}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions);
                      setSectorIds(selectedOptions.map(option => parseInt(option.value)));
                    }}
                  >
                    {renderOptions(sectors)}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAgree" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Agree to terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block="true" className="mt-4">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
