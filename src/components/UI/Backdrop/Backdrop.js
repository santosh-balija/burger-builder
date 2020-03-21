import React from 'react';

import clasees from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className = {clasees.Backdrop}
                        onClick = {props.clicked}>
                        </div> : null
); 

export default  backdrop;