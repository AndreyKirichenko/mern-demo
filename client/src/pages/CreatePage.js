import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async (event) => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`,
        });
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: 32}} >
        <div className='input-field'>
          <input
            placeholder='some-link-address.com'
            id='link'
            type='text'
            onChange={event => setLink(event.target.value)}
            onKeyPress={pressHandler}
            value={link}
          />

          <label htmlFor='link'>Введите ссылку</label>
        </div>     
      </div>
    </div>
  )
};
