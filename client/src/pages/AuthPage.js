import React, { useState, useEffect, useContext } from 'react';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  console.log('auth:', auth);
  const message = useMessage();
  const { error, loading, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async () => {
    try {
      const  data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const  data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='row'>
      <form className='col s6 offset-s3'>
        <h1>Сократи ссылку</h1>

        <div className='card white'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            
            <div className='input-field'>
              <input
                placeholder='Введите email'
                id='email'
                type='text'
                name='email'
                onChange={changeHandler}
                value={form.email}
              />

              <label htmlFor='email'>
                Email
              </label>
            </div>

            <div className='input-field'>
              <input
                placeholder='Введите пароль'
                id='password'
                type='password'
                name='password'
                onChange={changeHandler}
                value={form.password}
              />

              <label htmlFor='password'>
                Пароль
              </label>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-3 black-text'
              style={{ marginRight: 8 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>

            <button
              className='btn blue lighten-2 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};
