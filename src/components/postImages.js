import React from 'react';
import { Icon } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';

const PostImages = props => {
    const { images , removeImage } = props

    const imageStyle = { 
        display: 'inline-block',
        margin: '0 .25rem .5rem'
    }

    const renderImage = (image) => {
        const imgSrc = URL.createObjectURL(image)
        return (
            <div key={image.name}>
                <Icon size="small" name="trash" style={{float:'left'}} onClick={() => removeImage(image) }/>
                <CustomImage src={imgSrc} style={imageStyle} size="small" />
            </div>
        )
    }

    return(
        <div style={{ display:"inline-flex" }}>
            {
                images.map(image => {
                    return renderImage(image)
                })
            }
        </div>
    )
}

export default PostImages