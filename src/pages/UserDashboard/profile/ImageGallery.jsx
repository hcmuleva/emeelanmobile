import React, { useState, useEffect } from "react";
import { Image, Row, Col } from "antd";

const ImageGallery = ({ pictures }) => {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (pictures.length > 0) {
      setMainImage(pictures[0]);
    }
  }, [pictures]);

  return (
    <div>
      {/* Main Image */}
      {mainImage && (
        <Image
          src={mainImage}
          alt="Main"
          width={350}
          height={300}
          style={{
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      )}

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
