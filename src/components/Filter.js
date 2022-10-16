import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Filter = ({ filter, changeFilter, searchTestHandler, clearFilterHandler }) => {
  return (
    <Wrapper className="course form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchTestHandler();
        }}>
        <div>
          {/* Start Search */}
          <h3>Search: </h3>
          <div className="input-container">
            {/* <input type="text" name="name" placeholder="Type..." value="" /> */}
            <input
              type="text"
              name="search"
              value={filter.search}
              onChange={changeFilter}
              placeholder="Type..."
            />
            <input type="submit" name="name" value="Search" />
          </div>
          {/* End Search */}

          {/* Start category */}
          <h3>Question Type:</h3>
          <div className="question-type">
            <div className="btns">
              {['All', 'Multiple Choice', 'Fill Blank'].map((val, index) => (
                <button
                  key={index}
                  style={{ color: '#284664', borderColor: '#284664' }}
                  className={
                    val
                      .split(' ')
                      .map((val) => val.toLowerCase())
                      .join('') === filter.type
                      ? 'highlight'
                      : ''
                  }
                  name="type"
                  onClick={changeFilter}>
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* End category */}

        {/* Start Sort */}
        <div>
          <h3>Sort:</h3>
          <select className="select" name="sort" value={filter.sort} onChange={changeFilter}>
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="title">Name A-Z</option>
            <option value="-title">Name Z-A</option>
          </select>

          <h3>Test type:</h3>
          <select
            className="select"
            name="testType"
            value={filter.testType}
            onChange={changeFilter}>
            <option value="reading">Reading</option>
            <option value="listening">Listening</option>
          </select>
        </div>

        <Button type="primary" size="large" className="filter-btn" onClick={clearFilterHandler}>
          Clear Filter
        </Button>
        {/* End Sort */}
      </form>
    </Wrapper>
  );
};

export default Filter;

const Wrapper = styled.div`
  h3 {
    margin: 14px 0 10px;
    color: #fff;
    color: #284664;
    font-size: 24px;
    line-height: 28px;
  }

  .input-container {
    display: flex;
    margin-bottom: 2rem;
  }

  input {
    display: inline-block;
    font-size: 20px;
    box-sizing: border-box;
    transition: 0.5s;
  }

  input[type='text'] {
    background-color: #fff;
    width: 300px;
    height: 40px;
    border: none;
    outline: none;
    padding: 0 25px;
    border-radius: 25px 0 0 25px;
    border: 2px solid #284664;
  }

  input[type='submit'] {
    border-radius: 0 25px 25px 0;
    width: 100px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #6e0b21;
    background-color: #284664;
    color: #fff;
    transition: 0.2s;
  }

  input[type='submit']:active {
    background-color: #8b008b;
    scale: 0.7;
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  }

  .btns {
    display: flex;
    gap: 3.8rem;
  }

  .btns button {
    font-size: 1.8rem;
    color: #fcf3cf;
    background-color: transparent;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #fcf3cf;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20rem;
  }

  .select {
    font-size: 1.7rem;
    width: 18rem;
    height: 4rem;
    border-radius: 4px;
    padding: 0 1.5rem;
    border: 2px solid #284664;
  }

  .highlight {
    border-bottom: 2px solid #fcf3cf;
  }

  .filter-btn {
    background-color: #284664;
    border: none;
    margin-top: 5rem;
    transition: 0.2s;
  }

  .filter-btn:hover {
    /* background-color: #8b008b; */
  }

  .filter-btn:active {
    scale: 0.7;
  }

  @media (max-width: 1380px) {
    form {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 826px) {
    form {
      display: flex;
      flex-direction: column;
      row-gap: 3rem;
    }

    .filter-btn {
      margin-left: 4rem;
    }
  }
`;
