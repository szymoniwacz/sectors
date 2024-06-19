import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';
import './App.css';

const App = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [sectorIds, setSectorIds] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageKey, setMessageKey] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get('/api/v1/sectors', {
          params: { locale: i18n.language }
        });
        setSectors(response.data);
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/v1/users/me');
        const user = response.data;
        if (user) {
          setName(user.name);
          setSectorIds(user.sector_ids);
          setAgreeToTerms(user.agree_to_terms);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLoading(false);
      }
    };

    fetchSectors();
    fetchUser();
  }, [i18n.language]);

  const renderOptions = (sectors, parentId = null, level = 0) =>
    sectors
      .filter(sector => sector.parent_id === parentId)
      .map(sector => (
        <React.Fragment key={sector.id}>
          <option value={sector.id}>{Array(level).fill('\u00A0\u00A0\u00A0\u00A0').join('')}{sector.name}</option>
          {renderOptions(sectors, sector.id, level + 1)}
        </React.Fragment>
      ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/v1/users', { name, sector_ids: sectorIds, agree_to_terms: agreeToTerms });
      setMessageKey('sectorForm.formSubmittedSuccessfully');
      setMessageType('success');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessageKey('sectorForm.failedToSubmitForm');
      setMessageType('danger');
      setErrorMessage(error.response?.data?.error?.details || error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/users/logout');
      setName('');
      setSectorIds([]);
      setAgreeToTerms(false);
      setMessageKey('sectorForm.loggedOutSuccessfully');
      setMessageType('info');
    } catch (error) {
      console.error('Error logging out:', error);
      setMessageKey('sectorForm.failedToLogout');
      setMessageType('danger');
      setErrorMessage(error.response?.data?.error?.details || error.message);
    }
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  if (loading) return <div>{t('sectorForm.loading')}</div>;

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="8">
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <h1 className="text-center">{t('sectorForm.title')}</h1>
                </Col>
                <Col md="auto">
                  <ButtonGroup>
                    <Button
                      variant={i18n.language === 'en' ? 'primary' : 'outline-primary'}
                      onClick={() => handleLanguageChange('en')}
                    >
                      English
                    </Button>
                    <Button
                      variant={i18n.language === 'et' ? 'primary' : 'outline-primary'}
                      onClick={() => handleLanguageChange('et')}
                    >
                      Eesti
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col md="auto">
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                  >
                    {t('sectorForm.logout')}
                  </Button>
                </Col>
              </Row>
              {messageKey && (
                <Alert variant={messageType}>
                  {t(messageKey)}
                  {errorMessage && <div>{errorMessage}</div>}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} data-testid="sector-form">
                <Form.Group controlId="formName">
                  <Form.Label>{t('sectorForm.name')}</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formSectors" className="mt-3">
                  <Form.Label>{t('sectorForm.sectors')}</Form.Label>
                  <Form.Control as="select" multiple className="large-select" value={sectorIds} onChange={(e) => setSectorIds(Array.from(e.target.selectedOptions).map(option => parseInt(option.value)))}>
                    {renderOptions(sectors)}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAgree" className="mt-3">
                  <Form.Check type="checkbox" label={t('sectorForm.agreeToTerms')} checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required />
                </Form.Group>
                <Button variant="primary" type="submit" block="true" className="mt-4">{t('sectorForm.save')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
