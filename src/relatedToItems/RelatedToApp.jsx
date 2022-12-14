import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedToList from './RelatedToList.jsx';

function RelatedToApp({ currentProduct, setCurrentProduct, isDarkMode }) {
  return (
    <div id="related-to-widget">
      <p className="related-products">RELATED PRODUCTS</p>
      <RelatedToList
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default RelatedToApp;
