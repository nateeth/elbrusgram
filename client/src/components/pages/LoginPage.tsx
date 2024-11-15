import React from 'react';
import {useState} from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { Grid2 } from '@mui/material';
import axiosInstance, { setAccessToken } from '../../utils/axiosInstance';
import { loginUser } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hook';

export default function LoginPage(): JSX.Element {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [regname, setRegName] = useState('');
    const [regpassword, setRegPassword] = useState('');
    const [regemail, setRegEmail] = useState('');
    const [regnick, setRegNick] = useState('');
    
    const [login, setLogin] = useState(true);

    const dispatch = useAppDispatch();

    const handleRegister = async (e: React.FormEvent): Promise<void> =>{
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register', {regname, regpassword, regemail, regnick});
            setAccessToken(response.data.accessToken);
            alert('Вы успешно зарегистрированы')
            window.location.reload();
        } catch (error) {
            alert('Регистрация не прошла');
        }
    };

    const handleLogin  = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!email || !password) {
        alert('Email and password are required');
        return;
    }
        try {
            dispatch(loginUser({email, password}));
        } catch (error) {
            alert('Что-то пошло не так')
        }
    }

    return (
      <div>
        <Grid2 container spacing={2} className="loginPage">
          {login ? (
            <form className="inputForm" onSubmit={handleLogin}>
              <div id="logtext">ВОЙТИ</div>
              <div>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit">Войти</Button>
              <Button onClick={() => setLogin(false)}>Зарегистрироваться</Button>
            </form>
          ) : (
            <form className="inputForm" onSubmit={handleRegister}>
              <div id="logtext">РЕГИСТРАЦИЯ</div>
              <div>
                <Input
                  type="text"
                  placeholder="ваше имя"
                  value={regname}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ваш никнэйм"
                  value={regnick}
                  onChange={(e) => setRegNick(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ваш email"
                  value={regemail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ваш пароль"
                  value={regpassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Зарегистрироваться</Button>
              <Button onClick={() => setLogin(true)}>Войти</Button>
            </form>
          )}
        </Grid2>
      </div>
    );
}
