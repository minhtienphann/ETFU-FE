import React from 'react';
import image from '../assets/home-img.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import Spinner from '../components/spinner/Spinner';

const HomePage = () => {
  return (
    <Wrapper className="home">
      <div className="content">
        <h3>Get Ready for Your IELTS Test</h3>
        <p>Take our mock tests as many as you want for FREE!</p>
        <div className="btn-container">
          <Link to="/practice" className="btn">
            Take the practice test?
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={image} alt="" />
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.section`
  height: 85vh;
  .btn-container {
    display: flex;
    gap: 2rem;
  }
`;
