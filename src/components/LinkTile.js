
import { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { Col, Row, Card, CardBody,  } from 'reactstrap';
class LinkTile extends Component {

    constructor(props) {
        super(props);
    }
    render () {
        const { text,  statIcon, bgColor, link="/"} = this.props;
        return (
            <Col>
                <Link href={link}><a className="text-white">
                  <Card className={`bg-${bgColor} rounded card-box`}>
                          <CardBody>
                              <Row>
                                  <Col className="text-center align-items-center">
                                      <h2 className="text-white"><FontAwesomeIcon icon={statIcon}/></h2>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col className="text-center align-items-center">
                                      <h5 className="text-white">{text}</h5>
                                  </Col>
                              </Row>
                          </CardBody>
                  </Card>
                </a></Link>
            </Col>
        );
    }

}

export default LinkTile;
