import React,{Fragment} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleNotch);


export default (props) => (
  <div className="mt-3">
    <h4 className="text-secondary d-inline"><span className="fs-2-5-vw"><FontAwesomeIcon icon='circle-notch' spin /></span></h4><p className="text-secondary d-inline"> {props.text}...</p>
  </div>
)
