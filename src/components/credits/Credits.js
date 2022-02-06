import React from 'react';
import { Card, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import './Credits.css';

const Credits = () => {
  return (
    <Card title="📸 PicMaps 🗺" bordered={false} style={{ width: 200 }}>
      <p></p>
      <Row className="creditsRow">
        <a href="https://twitter.com/ialixandroae" target="_blank">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <span className="creditsText">ialixandroae</span>
        </a>
      </Row>
      <Row className="creditsRow">
        <a href="https://www.linkedin.com/in/ialixandroae/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          <span className="creditsText">ialixandroae</span>
        </a>
      </Row>
      <Row className="creditsRow">
        <a href="https://github.com/ialixandroae/pic-maps" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <span className="creditsText">ialixandroae</span>
        </a>
      </Row>
    </Card>
  );
};

export default Credits;
