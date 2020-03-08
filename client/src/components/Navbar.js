import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-4" style={{ padding: '0 16px'}}>
        <a href="/" className="brand-logo">Сокращение ссылок</a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  );
};
