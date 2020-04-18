import React from 'react';
import { Loader } from 'semantic-ui-react';

export const CustomLoader = props => {
    return(
        <Loader active={props.active} style={{ position:"fixed" , top:"50%"  , left:"50%"}} inline='centered'/>
    )
}