import React, { useContext } from 'react';
import { Layout, Row, Col } from 'antd';
import { store } from '../../store/store';
import { WebMapView } from '../map/Map';
import './Main.css';

const { Header, Content } = Layout;

function Main() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  return (
    <Layout>
      <Content>
        <Row>
          <Col className="map-col">
            <WebMapView />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Main;
