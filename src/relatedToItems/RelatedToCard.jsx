import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

function RelatedToCard({ id, setCurrentProduct }) {
  const [productInfo, setProductInfo] = useState({});
  const [productImage, setProductImage] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProductInfo(response.data);
      });
    axios.get(`http://localhost:3001/styles/${id}`)
      .then((response) => {
        setProductImage(response.data.results[0].photos[0].thumbnail_url);
      });
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentProduct(id);
  }

  return (
    !Object.keys(productInfo).length ? null
      : (
        <div className="related-to-card" onClick={handleClick}>
          <div className="related-to-card-gallery">
            <img className="related-to-img" style={{ width: '50%' }} src={productImage} alt="404 Not Found" />
          </div>
          <div className="related-to-info">
            <div className="related-to-category">{productInfo.category.toUpperCase()}</div>
            <div className="related-to-name">{productInfo.name}</div>
            <div className="related-to-price">{productInfo.default_price}</div>
          </div>
          <StarRatings
            rating={3}
            starRatedColor="black"
            starDimension="1.5vw"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
          />
        </div>
      )
  );
}

export default RelatedToCard;
