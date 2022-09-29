import React, { useEffect, useReducer, useState } from 'react';
import CountDownTimer from '../components/timer/CountDownTimer';
import Spinner from '../components/spinner/Spinner';
import Result from '../components/result/Result';
import MultipleChoice from '../components/question_type/MultipleChoice';
import FillBlank from '../components/question_type/FillBlank';
import NotFoundPage from './NotFoundPage';
import exam_reducer from '../reducer/exam_reducer';
import { reading_exam_url, listening_exam_url } from '../utils/constants';
import { getPadTime } from '../utils/helpers';

import { useParams } from 'react-router-dom';
import { Button, Pagination, Popconfirm } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { AiOutlineAlignCenter } from 'react-icons/ai';

import 'react-reflex/styles.css';
import 'react-h5-audio-player/lib/styles.css';

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  correctAnswer: [],
  userAnswer: [],
  totalCorrectAnswer: 0,
  totalInCorrectAnswer: 0,
  totalUnAnswered: 0,
  showResult: false,
  userSecond: 0,
  userMinute: 0,
  questionTypes: [],
  typeTest: '',
  firstRender: true
};

const ExamDetailPage = () => {
  const params = useParams();
  const [page, setPage] = useState(1);

  const examMinutes = getPadTime(Math.floor(+localStorage.getItem(`examLocal${params.id}`) / 60));
  const examSeconds = getPadTime(+localStorage.getItem(`examLocal${params.id}`) - examMinutes * 60);

  console.log(examMinutes, 'examMinutes');
  console.log(examSeconds, 'examSeconds');

  let localStage = {};

  console.log(params.id === 'reading' ? reading_exam_url : listening_exam_url);

  if (localStorage.getItem('reset_exam_detail')) {
    localStorage.removeItem('reset_exam_detail');
    localStorage.removeItem(`reading_detail${params.id}`);
    localStorage.removeItem(`examLocal${params.id}`);
  }

  const [state, dispatch] = useReducer(exam_reducer, initialState);

  if (state.firstRender) {
    localStage = state;
  }

  if (!state.firstRender) {
    localStorage.setItem(`reading_detail${params.id}`, JSON.stringify(state));
    localStage = JSON.parse(localStorage.getItem(`reading_detail${params.id}`));
  }

  const getData = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      const response = await axios.get(
        `${params.id === 'reading' ? reading_exam_url : listening_exam_url}`
      );
      const data = response.data;
      console.log(data, 'dsgsdvsdvd');
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const getUserInput = (e) => {
    let value = e.target.value;
    const name = +e.target.name;
    dispatch({ type: 'GET_USER_INPUT', payload: { value, name } });
  };

  const submitHandler = () => {
    dispatch({ type: 'SHOW_RESULT' });
  };

  const submitWhenTimeout = (time) => {
    if (time === 0) {
      submitHandler();
    }
  };

  useEffect(() => {
    if (localStorage.getItem(`reading_detail${params.id}`) === null) {
      getData();
    } else {
      dispatch({ type: 'GET_LOCAL_STORAGE', payload: { id: params.id } });
    }
  }, []);

  if (state.isLoading === false) {
    console.log(state, 'state');
  }

  const confirm = (e) => {
    submitHandler();
  };

  return (
    <Wrapper>
      {localStage.isLoading && <Spinner />}
      {localStage.isError && <NotFoundPage />}

      {localStage.isLoading === false && localStage.showResult === false && (
        <>
          <CountDownTimer submitWhenTimeout={submitWhenTimeout} param={params.id} />

          {localStage.typeTest === 'reading' || (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#284664',
                marginTop: '-32px',
                paddingBottom: '14px'
              }}>
              <AudioPlayer
                style={{
                  borderRadius: '1rem',
                  width: '50%',
                  textAlign: 'center',
                  background: '#94a3b8',
                  marginTop: '30px',
                  fontWeight: 'bold'
                }}
                autoPlay
                src={localStage.data.video}
                onPlay={(e) => console.log('onPlay')}
                header={`Now playing: ${localStage.data.title}`}
                footer="All record from: WWW.english-exam.org"
              />
            </div>
          )}

          <div className="container">
            <ReflexContainer orientation="vertical">
              {localStage.typeTest === 'reading' && (
                <ReflexElement minSize="20">
                  <div className="article">
                    <h1>{localStage.data.exams[page - 1].title}</h1>
                    <img src={localStage.data.exams[page - 1].image.name} alt="" />
                    <p
                      style={{
                        fontSize: '17px',
                        paddingBottom: '20px',
                        whiteSpace: 'pre-wrap'
                      }}>
                      {localStage.data.exams[page - 1].content}
                    </p>
                  </div>
                </ReflexElement>
              )}

              {localStage.typeTest === 'reading' && (
                <ReflexSplitter
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '14px'
                  }}>
                  <AiOutlineAlignCenter style={{ transform: 'rotate(90deg)' }} />
                </ReflexSplitter>
              )}

              <ReflexElement minSize="20">
                <div className="exam">
                  <div
                    className={
                      localStage.typeTest === 'listening' ? 'margin-left' : 'margin-left-read'
                    }>
                    {localStage.questionTypes[page - 1].map((questionType) => {
                      return (
                        <>
                          {questionType === 'multiplechoice' && (
                            <h2 style={{ marginTop: '20px' }}>
                              Choose the correct letter,{' '}
                              <span style={{ color: '#FF5100' }}>A, B, C</span> or{' '}
                              <span style={{ color: '#FF5100' }}>D.</span>
                            </h2>
                          )}

                          {questionType === 'fillblank' && (
                            <h2 style={{ marginTop: '10px' }}>
                              Write{' '}
                              <span style={{ color: '#FF5100' }}>
                                NO MORE THAN THREE WORDS AND/OR A NUMBER{' '}
                              </span>
                              for each answer
                            </h2>
                          )}

                          {questionType === 'multiplechoice' &&
                            localStage.data.exams[page - 1].questions.map((val, index) => {
                              let valIndex = 0;
                              if (val.type === 'multiplechoice') {
                                if (page === 1) valIndex = index;
                                if (page === 2) {
                                  valIndex = index + localStage.data.exams[0].questions.length;
                                }
                                if (page === 3) {
                                  valIndex =
                                    index +
                                    localStage.data.exams[0].questions.length +
                                    localStage.data.exams[1].questions.length;
                                }
                                return (
                                  <MultipleChoice
                                    id={val._id}
                                    index={valIndex}
                                    val0={val.content[0]}
                                    userAnswer={localStage.userAnswer[valIndex]}
                                    getUserInput={getUserInput}
                                    answers={val.answer}
                                  />
                                );
                              }
                            })}

                          <div
                            style={{
                              width: '90%',
                              marginBottom: '20px'
                            }}>
                            {questionType === 'fillblank' &&
                              localStage.data.exams[page - 1].questions.map((val, index) => {
                                let valIndex = 0;
                                if (val.type === 'fillblank') {
                                  if (page === 1) valIndex = index;
                                  if (page === 2) {
                                    valIndex = index + localStage.data.exams[0].questions.length;
                                  }
                                  if (page === 3) {
                                    valIndex =
                                      index +
                                      localStage.data.exams[0].questions.length +
                                      localStage.data.exams[1].questions.length;
                                  }

                                  return (
                                    <FillBlank
                                      id={val._id}
                                      index={valIndex}
                                      val0={val.content[0]}
                                      val1={val.content[1]}
                                      userAnswer={localStage.userAnswer[valIndex]}
                                      getUserInput={getUserInput}
                                    />
                                  );
                                }
                              })}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginRight: '130px',
                      alignItems: 'center'
                    }}>
                    <Pagination
                      simple
                      current={page}
                      onChange={(page) => setPage(page)}
                      total={30}
                    />
                    <Popconfirm
                      title="Are you sure you want to submit?"
                      onConfirm={confirm}
                      okText="Yes"
                      cancelText="No">
                      {page === 3 && (
                        <Button
                          type="primary"
                          size="large"
                          style={{ backgroundColor: '#284664', marginBottom: '10px' }}
                          className={
                            localStage.typeTest === 'listening' ? 'margin-left' : 'margin-left-read'
                          }>
                          Submit
                        </Button>
                      )}
                    </Popconfirm>
                  </div>
                </div>
              </ReflexElement>
            </ReflexContainer>
          </div>
        </>
      )}
      {localStage.isLoading === false && localStage.showResult === true && (
        <Result
          totalCorrectAnswer={localStage.totalCorrectAnswer}
          totalInCorrectAnswer={localStage.totalInCorrectAnswer}
          totalUnAnswered={localStage.totalUnAnswered}
          correctAnswer={localStage.correctAnswer}
          userAnswer={localStage.userAnswer}
          exam={true}
          params={params}
          examSeconds={examSeconds}
          examMinutes={examMinutes}
        />
      )}
    </Wrapper>
  );
};

export default ExamDetailPage;

const Wrapper = styled.section`
  .container {
    width: 100%;
    height: 78vh;
    display: grid;
  }
  .article {
    height: 78vh;
    padding: 0 35px;
    overflow-y: scroll;
  }
  .exam {
    height: 78vh;
    overflow-y: scroll;
    background-color: #e5e7eb;
    border-bottom-left-radius: 5px;
    padding: 0 20px;
  }

  .exam h2 {
    line-height: 1.8rem;
    font-weight: bold;
  }

  .question {
    margin: 10px 0;
  }

  h1 {
    font-size: 45px;
    text-align: center;
    color: #284664;
    margin-top: 5px;
  }

  img {
    height: 15rem;
    width: 100%;
    object-fit: contain;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 1.8rem;
  }

  .radio-btn {
    font-size: 1.8rem;
  }

  .question-container {
    margin: 3rem 0;
    padding-left: 20px;
  }

  .margin-left {
    margin-left: 100px;
  }

  .margin-left-read {
    margin-left: 20px;
  }
  /* ------------------------------- */
  .timer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: #284664;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
  }

  .timer h2 {
    color: white;
    font-size: 2.9rem;
    line-height: 0.9;
    font-weight: bold;
    padding-top: 2rem;
  }

  .clock {
    width: 5rem;
    height: 5rem;
    color: white;
  }

  .clock-container {
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }

  .reflex-container.vertical > .reflex-splitter {
    border-right: 1px solid #c6c6c6;
    border-left: 1px solid #c6c6c6;
    cursor: col-resize;
    height: 100%;
    width: 2px;
  }

  .ant-pagination {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
`;
