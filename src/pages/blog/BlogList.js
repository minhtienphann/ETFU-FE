import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BlogList = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/posts?type=&search&page').then((res) => {
      setBlog(res.data);
    });
  }, []);
  function renderBlog() {
    if (blog.length > 0) {
      return blog.map((value, key) => {
        // const imgLink = '../../assets/' + value.image;
        return (
          <div className="blog-list">
            {/* <img src={image} alt="" className="blog-list-img" /> */}
            <div className="container-blog">
              <Link to="/blog-detail">
                <h3>{value.title}</h3>
              </Link>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: '5px', fontSize: '20px' }}>
                sell
              </span>
              <Link style={{ fontSize: '16px', color: '#333' }}>{value.type}</Link>
              <br />
              <span className="content-blog-list">{value.content}</span>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <div>
      <div className="center">
        <h1>BLOG LIST</h1>
      </div>
      <div>
        <input type="text" placeholder="Search Blog" defaultValue={''} />
        <button></button>
        <select name="tag">
          <option value="">Choose Tag</option>
          <option value="Grammar">Grammar</option>
          <option value="Vocabulary">Vocabulary</option>
        </select>
      </div>
      {renderBlog()}
      <div className="blog-list">
        <img
          src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/10/27/lichwc-1-16668871327101375335294.png"
          alt=""
          className="blog-list-img"
        />
        <div className="container-blog">
          <Link to="/blog-detail">
            <h3>GIRLS PINK T SHIRT ARRIVED IN STORE</h3>
          </Link>
          <span
            className="material-symbols-outlined"
            style={{ marginRight: '5px', fontSize: '20px' }}>
            sell
          </span>
          <Link style={{ fontSize: '16px', color: '#333' }}>Vocabulary</Link>
          <br />
          <span className="content-blog-list">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </span>
        </div>
      </div>

      <div className="blog-list">
        <img
          src="https://vtv1.mediacdn.vn/thumb_w/1000/2022/10/27/lichwc-1-16668871327101375335294.png"
          alt=""
          className="blog-list-img"
        />
        <div className="container-blog">
          <Link to="/blog-detail">
            <h3>GIRLS PINK T SHIRT ARRIVED IN STORE</h3>
          </Link>

          <span
            className="material-symbols-outlined"
            style={{ marginRight: '5px', fontSize: '20px' }}>
            sell
          </span>
          <Link style={{ fontSize: '16px', color: '#333' }}>Vocabulary</Link>
          <br />
          <span className="content-blog-list">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </span>
        </div>
      </div>

      <div className="center">
        <nav aria-label="...">
          <ul class="pagination pagination-lg">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default BlogList;
