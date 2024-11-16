import React, { useState } from "react";
import { Image, Row, Col } from "antd";

const ImageGallery = ({pictures}) => {
  const [mainImage, setMainImage] = useState(pictures[0]);

  const thumbnails = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/?blur",
    "https://via.placeholder.com/604",
   
  ];

  return (
    <div>
      {/* Main Image */}
      <Image 
        src={mainImage} 
        alt="Main" 
        width={350} 
        height={300} 
        style={{ marginBottom: "20px", border: "1px solid #ddd", borderRadius: "4px" }}
      />

      {/* Thumbnails */}
      <Row gutter={[16, 16]}>
        {pictures.map((thumbnail, index) => (
          <Col key={index} span={4}>
            <Image
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              preview={false}
              style={{
                cursor: "pointer",
                border: mainImage === thumbnail ? "1px solid #1890ff" : "1px solid #ddd",
                borderRadius: "4px",
              }}
              onClick={() => setMainImage(thumbnail)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageGallery;
