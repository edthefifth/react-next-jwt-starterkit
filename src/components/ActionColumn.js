import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button, UncontrolledPopover, PopoverBody, PopoverHeader, Row ,Col  } from 'reactstrap';
class ActionColumn extends Component {

        constructor(props){
          super(props);
          this.state = {
            filterShowing : false,
            value:''
          };
        }
        onFilter = (e) => {
          const filter = {[e.target.name]:e.target.value};
          const value = e.target.value;
          this.setState({value:e.target.value});

        }

        onSubmitFilter = (e) =>{
          const {name} = this.props;
          const {value} = this.state;
          const filter = {};
          filter[name]=value;
          console.log(filter);
          this.props.handleClick(filter);
        }

        toggleFilter = (e) => {
          console.log(this.state.filterShowing);
          this.setState({filterShowing:!this.state.filterShowing});
        }

        render () {


            if(this.props.filter){
              const id = `${this.props.name}-header`;
              return (
                <td className='nowrap' scope="col" >
                    {this.props.value}
                    <Button color='link' name={this.props.name} id={id}  >
                      { this.props.icon &&
                        <FontAwesomeIcon icon={this.props.icon}   />
                      }
                    </Button>
                    <UncontrolledPopover placement="top" target={id}>
                      <PopoverBody>
                        <Row>
                          <Col xs="6" sm="9"><Input name={this.props.name} defaultValue={this.state.value} onChange={this.onFilter} /></Col>
                          <Col xs="6" sm="3"><Button color='primary' onClick={this.onSubmitFilter}>Go</Button></Col>
                        </Row>
                      </PopoverBody>
                    </UncontrolledPopover>
                </td>
              );
            } else {
              return (
                  <td scope="col">
                      <Button name={this.props.name} onClick={this.props.handleClick}>
                        {this.props.value}
                      </Button>
                  </td>
              );
            }

        }
}


export default ActionColumn;
