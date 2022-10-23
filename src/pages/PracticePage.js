import React, { useEffect, useReducer } from 'react';
import List from '../components/List';
import Paginate from '../components/Paginate';
import Filter from '../components/Filter';
import Spinner from '../components/spinner/Spinner';
import NoProduct from '../components/notification/NoProduct';
import Error from '../components/error/Error';

import axios from 'axios';
import { reading_tests_url, listening_tests_url } from '../utils/constants';
import reducer from '../reducer/practice_reducer';
import { useParams } from 'react-router-dom';

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  curPage: 1,
  totalPage: 0,
  filter: {
    search: '',
    type: 'all',
    sort: '-createdAt',
    testType: 'reading'
  },
  reset: 0
};

const ReadingPage = () => {
  let searchLocal = localStorage.getItem('search');
  let typeLocal = localStorage.getItem('type');
  let sortLocal = localStorage.getItem('sort');
  let curPageLocal = localStorage.getItem('curPage');
  // let testTypeLocal = localStorage.getItem('testType');

  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  let url = `${
    state.filter.testType === 'reading' ? reading_tests_url : listening_tests_url
  }&page=${state.curPage}${state.filter.search === '' ? '' : `&search=${state.filter.search}`}${
    state.filter.type === 'all' ? '' : `&choice=${state.filter.type}`
  }&sort=${state.filter.sort}`;

  const getData = async (url) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      const response = await axios.get(url);
      const data = response.data;
      setTimeout(() => {
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
      }, 500);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const setCurPage = (value) => {
    localStorage.setItem('curPage', String(value));
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
  };

  const changeFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'type') {
      value = e.target.textContent
        .split(' ')
        .map((val) => val.toLowerCase())
        .join('');
    }
    localStorage.setItem(name, String(value));
    localStorage.setItem('curPage', '1');
    dispatch({ type: 'CHANGE_FILTER', payload: { name, value } });
  };

  const searchTestHandler = () => {
    getData(
      `${state.filter.testType === 'reading' ? reading_tests_url : listening_tests_url}&page=1${
        searchLocal === '' ? '' : `&search=${searchLocal}`
      }${typeLocal === 'all' ? '' : `&choice=${typeLocal}`}&sort=${sortLocal}`
    );
    // state.filter.search = '';
  };

  const clearFilterHandler = () => {
    localStorage.setItem('search', '');
    localStorage.setItem('type', 'all');
    localStorage.setItem('sort', '-createdAt');
    localStorage.setItem('curPage', '1');
    dispatch({ type: 'CLEAR_FILTER' });
  };

  useEffect(() => {
    if (
      localStorage.getItem('search') === null ||
      localStorage.getItem('type') === null ||
      localStorage.getItem('sort') === null
    ) {
      localStorage.setItem('search', '');
      localStorage.setItem('type', 'all');
      localStorage.setItem('sort', '-createdAt');
      getData(url);
    } else {
      getData(
        `${
          state.filter.testType === 'reading' ? reading_tests_url : listening_tests_url
        }&page=${curPageLocal}${searchLocal === '' ? '' : `&search=${searchLocal}`}${
          typeLocal === 'all' ? '' : `&choice=${typeLocal}`
        }&sort=${sortLocal}`
      );
    }
  }, [state.curPage, state.filter.type, state.filter.sort, state.filter.testType, state.reset]);

  if (state.isLoading === false) {
    console.log(state);
  }

  return (
    <>
      <h1 className="heading">Practice tests</h1>
      <Filter
        filter={state.filter}
        changeFilter={changeFilter}
        searchTestHandler={searchTestHandler}
        clearFilterHandler={clearFilterHandler}
      />
      {state.isLoading === true && <Spinner />}
      {state.isLoading === false && state.isError === false && <List data={state.data} />}
      {state.data.length < 1 && state.isLoading === false && <NoProduct />}
      <Paginate setCurPage={setCurPage} curPage={state.curPage} totalPage={state.totalPage} />
      {state.isError === true && <Error />}
    </>
  );
};

export default ReadingPage;
