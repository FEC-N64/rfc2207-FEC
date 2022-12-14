/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Answers from './Answers.jsx';
import AddAnswer from './AddAnswerModal.jsx';

function QuestionListEntry({
  item, onReport, currentProductName, isDarkMode,
}) {
  const [list, setList] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState(item.question_helpfulness);
  const [answerAdded, setAnswerAdded] = useState(0);
  const [index, setIndex] = useState(2);
  const aModal = useRef(null);

  useEffect(() => {
    axios.get(`/qa/questions/${item.question_id}/answers`)
      .then((response) => {
        if (response.data) {
          setList(response.data);
        }
      })
      .catch((err) => console.error(err));
  }, [item, helpful, answerAdded]);

  useEffect(() => {
    setAnswers(list.slice(0, index));
  }, [index, list]);

  const handleHelpful = () => {
    axios.put('/qa/questions/:question_id/helpful', { id: item.question_id })
      .then(() => setHelpful(helpful + 1))
      .catch((err) => console.error('client side helpful error: ', err));
  };

  const handleReport = () => {
    axios.put('/qa/questions/:question_id/report', { id: item.question_id })
      .then(() => { onReport(); })
      .catch((err) => console.error('client side helpful error: ', err));
  };

  const handleAnswerSubmit = (answer) => {
    axios.post(`/addanswer/${item.question_id}`, answer)
      .then(() => setAnswerAdded(answerAdded + 1))
      .catch((err) => console.error(err));
  };

  const handleMoreAnswers = (e) => {
    e.preventDefault();
    setIndex(list.length);
  };

  const handleLessAnswers = (e) => {
    e.preventDefault();
    setIndex(2);
  };

  const moreAnswersButton = list.length > answers.length
    ? (
      <p className="answer-buttons" onClick={(e) => handleMoreAnswers(e)}>
        LOAD MORE ANSWERS
      </p>
    ) : null;

  const lessAnswersButton = answers.length > 2
    ? (
      <p className="answer-buttons" onClick={(e) => handleLessAnswers(e)}>
        Collapse Answers
      </p>
    ) : null;

  const darkMode = {
    color: isDarkMode ? '#BDDEDB' : 'grey',
  };

  return (
    <div className="question-entry">
      <div id="question-title">
        <span id="question-body">
          <b>
            Q:&nbsp;
            {item.question_body}
          </b>
        </span>
        <span id="question-spans" style={darkMode}>
          Helpful?&nbsp;
          <button type="button" className="link-button" id="question-helpful-button" style={darkMode} onClick={handleHelpful}>
            Yes
            {`(${helpful})`}
          </button>
          <button type="button" className="link-button" id="add-answer-button" style={darkMode} onClick={() => aModal.current.open()}>Add Answer</button>
          <button type="button" className="link-button" id="question-report-button" style={darkMode} onClick={handleReport}>Report</button>
        </span>
        <AddAnswer
          ref={aModal}
          handleSubmit={handleAnswerSubmit}
          currentProductName={currentProductName}
          questionBody={item.question_body}
        />
      </div>
      <div className="answer-list">
        {answers.map((answer) => (
          <Answers
            answer={answer}
            isDarkMode={isDarkMode}
            key={answer.answer_id}
          />
        ))}
      </div>
      {moreAnswersButton}
      {lessAnswersButton}
    </div>
  );
}

export default QuestionListEntry;
