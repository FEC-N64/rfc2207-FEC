/* eslint-disable import/extensions */
import React, { useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import axios from 'axios';
import Overview from './overview/overviewIndex.jsx';
import RelatedToApp from './relatedToItems/RelatedToApp.jsx';
import RatingsApp from './ratingsAndReviews/RatingsApp.jsx';
import Questions from './q&a/QuestionsApp.jsx';

function App() {
  const [currentProduct, setCurrentProduct] = useState('66642');
  const [currentProductName, setCurrentProductName] = useState('');
  const [averageStars, setAverageStars] = useState(0);
  const [numberReviews, setNumberReviews] = useState(0);

  const [isDarkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  const reviewsRef = createRef();
  const scrollToReviews = () => {
    reviewsRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const trackClick = (input) => {
    axios.post('http://localhost:3001/click', input)
      .then(() => console.log('success'))
      .catch((err) => console.error('client side click error: ', err));
  };

  return (
    <div style={{
      background: isDarkMode ? '#1b242c' : '#faf9f8',
      color: isDarkMode ? '#BDDEDB' : 'black',
      transition: '0.8s background',
    }}
    >
      <header>
        <p
          style={{
            color: isDarkMode ? '#BDDEDB' : 'white',
          }}
          className="business-name"
        >
          Atelier&nbsp;

        </p>
      </header>
      <div className="sitewide-sale">
        <em>SITE-WIDE ANNOUNCEMENT MESSAGE!</em>
        {' '}
        -- SALE / DISCOUNT&nbsp;
        {' '}
        <b>OFFER</b>
        {' '}
        --
        {' '}
        <u>NEW PRODUCT HIGHLIGHT</u>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}

        />
      </div>
      <Overview
        currentProduct={currentProduct}
        averageStars={averageStars}
        numberReviews={numberReviews}
        setCurrentProductName={setCurrentProductName}
        scrollToReviews={scrollToReviews}
        trackClick={trackClick}
        isDarkMode={isDarkMode}
      />
      <RelatedToApp
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        isDarkMode={isDarkMode}
      />
      <Questions
        currentProduct={currentProduct}
        trackClick={trackClick}
        currentProductName={currentProductName}
        isDarkMode={isDarkMode}
      />
      <div ref={reviewsRef} />
      <RatingsApp
        currentProduct={currentProduct}
        currentProductName={currentProductName}
        setAverageStars={setAverageStars}
        setNumberReviews={setNumberReviews}
        trackClick={trackClick}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// export default index;
