
import { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync } from '@fortawesome/free-solid-svg-icons'
library.add(faSync);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class InfoTile extends Component {

    constructor(props) {
        super(props);
    }
    render () {
        const { statTitle, statValue, statIcon, bgColor} = this.props;
        const isLoading = statValue === null ? true : false;
        return (
            <div className="col-xl-3 col-lg-6 col-12 mb-3">
                <div className={`card bg-${bgColor}`}>
                    <div className="card-content">
                        <div className="card-body">
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <i className={`fa ${statIcon} text-white enlarge-font float-left`}></i>
                                </div>
                                {isLoading ?
                                (<div className="media-body white text-right">
                                    <h3 className="text-light"><FontAwesomeIcon icon='sync' spin /></h3>
                                    <span className="text-white">{statTitle}</span>
                                </div>):
                                (<div className="media-body white text-right">
                                    <h3 className="text-light">{statValue}</h3>
                                    <span className="text-white">{statTitle}</span>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default InfoTile;
