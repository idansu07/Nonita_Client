import React, { useContext } from 'react';
import { Lightbox } from "react-modal-image";
import { Context } from '../context';
import { IMAGE_MODAL } from '../actionType';
import { convertArrayBufferToBase64 } from '../utils/image';

const DEFAULT_IMAGE = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
const ImageModal = props => {
    const { active , arrayBuffer , src } = props
    const { dispatch } = useContext(Context)

    let imageSrc = arrayBuffer
    ? convertArrayBufferToBase64(arrayBuffer)
    : src ? src : DEFAULT_IMAGE

    return(
        active &&
            <Lightbox
                large={imageSrc}
                onClose={() => { dispatch({type:IMAGE_MODAL , payload: { active:false }})}}
            />
    )
}

export default ImageModal