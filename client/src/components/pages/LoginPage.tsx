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
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <form className="inputForm" onSubmit={handleRegister}>
              <div id="logtext">SignUp</div>
              <Input
                type="text"
                placeholder="Username"
                value={regname}
                onChange={(e) => setRegName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Nick"
                value={regnick}
                onChange={(e) => setRegNick(e.target.value)}
              />
              <Input
                type="text"
                placeholder="email"
                value={regemail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                value={regpassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <Button type="submit">SignUp</Button>
            </form>
          </Grid2>
          <Grid2 size={6}>
            <form className="inputForm" onSubmit={handleLogin}>
              <div id="logtext">Login</div>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Login</Button>
            </form>
          </Grid2>
        </Grid2>
      </div>
    );
}
