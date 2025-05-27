import React from 'react';
import Head from '../../components/head';
import NonprofitScroll from '../../components/clients/NonprofitScroll';
import { Container } from 'reactstrap';

function ClientsPage() {
  return (
    <>
      <Head title="Clients" />
      <Container>
        <NonprofitScroll />
      </Container>
    </>
  );
}

export default ClientsPage;
