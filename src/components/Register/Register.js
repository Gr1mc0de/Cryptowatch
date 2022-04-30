import React, {useContext} from 'react';
import {DarkMode} from '../../context/DarkMode';
import CurrencyData from '../../data/CurrencyData';

export default function Register(props) {
  const {darkMode,setDarkMode} = useContext(DarkMode);
  return (
    <main className='Register'>
      <form className={darkMode ? 'RegistrationForm darkRegistrationForm' : 'RegistrationForm'}>
        <img src={props.Knight}/>
        <div className='userInfo'>
          <div>
            <h2>Username</h2>
            <input className='username' placeholder='CyptoKnight'/>
          </div>
          <div>
            <h2>Password</h2>
            <input className='password' placeholder='*******'/>
          </div>
          <div>
            <h2>Profile picture</h2>
            <input type='file'/>
          </div>
          <div>
            <h2>Preferred currency</h2>
            <select>
              <option>{CurrencyData[14].convert}</option>
              {
                CurrencyData.map(c=>{
                  if (c.convert === 'EUR') {
                    return null
                  } else {
                    return (<option>{c.convert}</option>)
                  }
                })
              }
            </select>
          </div>
        </div>
        <div className='resetRegister'>
          <button className='reset' type='reset'>Reset</button>
          <button className='register' type='submit'>Register</button>
        </div>
      </form>
      <aside className={darkMode ? 'darkAside' : ''}>
        <h1>Register an account to keep track of your favorite coins!</h1>
      </aside>
    </main>
  );
}
