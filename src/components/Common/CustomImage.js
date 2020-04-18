import React from 'react';
import { convertArrayBufferToBase64 } from '../../utils/image';
import { Image } from 'semantic-ui-react';

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const CustomImage = props => {

    const {
        size = 'medium',
        onClick,
        src,
        arraybuffer
    } = props

    const handleClick = (event) => {
        if(onClick) onClick(event)
    }

    let imageSrc = arraybuffer
    ? convertArrayBufferToBase64(arraybuffer)
    : src ? src : DEFAULT_IMAGE

    return(
        <Image src={imageSrc} size={size} onClick={(e) => handleClick(e)} {...props} />
    )
}

export default CustomImage