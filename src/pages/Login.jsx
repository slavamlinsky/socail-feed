import React from 'react'
import { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'


const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth','true');
        
        //console.log(localStorage.getItem('auth'));
    }

  return (
    <div style={{minHeight: '85vh', display: 'flex', alignItems: 'center'}}>        
      <div style={{textAlign: 'center', width: '360px'}}>
        <img src='https://www.polygraph-rubicon.com/img/logo.png' style={{width: '70%', marginBottom: '25px'}} />
        {/* <h1>Вход в систему</h1> */}
        <form onSubmit={login}>
            <MyInput type="text" placeholder="Введите логин"/>
            <MyInput type="password" placeholder="Введите пароль"/>
            {/* <MyButton>Войти</MyButton> */}
            <button type='submit' className="loginBtn">ВОЙТИ</button>
            <br/><br/>
            <a href="/forgot" style={{textDecoration: 'none', color: '#555'}}>Забыли свой пароль?</a> 
        </form>
      </div>
    </div>
  )
}

export default Login