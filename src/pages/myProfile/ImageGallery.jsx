import React from 'react';
import { Card, Image } from 'antd';
const ImageGallery = ({ images }) => {
    console.log("images?.formats",images)
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {images.map((image) => (
          <Card
            key={image?.formats?.thumbnail?.url}
            hoverable
            style={{ width: 140 }}
            cover={
              <Image
                alt={image?.formats?.thumbnail.name}
                src={image?.formats?.thumbnail.url}
                preview={{
                  src: image?.formats?.thumbnail.url,
                }}
              />
            }
          >
            <Card.Meta 
              title={image?.formats?.thumbnail.name} 
              description={`${image?.formats?.thumbnail.width}x${image?.formats?.thumbnail.height} px`} 
            />
          </Card>
        ))}
      </div>
    );
  };
  
  export default ImageGallery;