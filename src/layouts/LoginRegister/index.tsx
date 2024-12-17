import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Container,
  RegisterContainer,
  LogInContainer,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  GhostButton,
  Paragraph,
  Form,
  Anchor,
  Title,
  Input,
  Button
} from '../../components/ComponentLogin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Typography } from '@mui/material';
import { GetApi, GetGuestApi, PostGuestApi } from 'src/Api';
import { toastWarning } from 'src/Logic';
import { useStore } from 'react-redux';
import { change_user } from 'src/reducers/Action';
function LoginRegister() {
  const [logIn, toggle] = React.useState(true);
  const [email, setEmail] = useState<string>('');
  const [errPhone, setErrPhone] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [errPassword, setErrPassword] = useState<boolean>(false);
  const [errRePassword, setErrRePassword] = useState<boolean>(false);
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const store = useStore();

  //

  const handleClickLogin = async (e: any) => {
    e.preventDefault();
    if (email == '' || password == '') {
      return;
    }
    const res = await PostGuestApi('/api/auth/login', {
      username: email,
      password: password
    });
    if (res.data.message == '403') {
      toastWarning('Username or password is incorrect');
      return;
    }
    if (res.status == 200) {
      window.localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }

    // window.location.href = '/';
  };

  const handleClickRegister = async (e: any) => {
    e.preventDefault();
    if (email == '' || password == '') {
    }
    if (password != rePassword) {
      toastWarning('Password is not match');
      return;
    }
    const res = await PostGuestApi('/api/auth/register', {
      username: email,
      password: password,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      sex: '',
      age: ''
    });
    if (res.status == 200) {
      window.localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }
  };

  //
  const changeIsHidePassword = () => {
    setIsHidePassword((prev) => !prev);
  };

  return (
    <div className="mt-3 flex justify-center align-center" style={{}}>
      <div
        className="mt-3 flex justify-center align-center"
        style={{
          width: 900,
          background: '#f6f5f7',
          padding: '30px',
          borderRadius: '10px'
        }}
      >
        <Container>
          <RegisterContainer logIn={logIn}>
            <Form>
              <Typography sx={{ mb: 1 }} variant="h3">
                Register
              </Typography>
              <span className="w-full">
                <Input
                  type={'text'}
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span className="w-full relative">
                <Input
                  type={isHidePassword ? 'password' : 'text'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span
                  className="absolute top-4 right-2"
                  onClick={changeIsHidePassword}
                >
                  {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </span>

              <span className="w-full relative">
                <Input
                  type={isHidePassword ? 'password' : 'text'}
                  placeholder="Re-password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <span
                  className="absolute top-4 right-2"
                  onClick={changeIsHidePassword}
                >
                  {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </span>
              <Button
                className="w-full mt-3"
                id="register-button"
                onClick={(e) => handleClickRegister(e)}
              >
                Register
              </Button>
            </Form>
          </RegisterContainer>

          {/*------------------------------- LOGIN-------------------------------------- */}

          <LogInContainer logIn={logIn}>
            <Form>
              <Typography sx={{ mb: 1 }} variant="h3">
                Login
              </Typography>
              <span className="w-full">
                <span className="w-full">
                  <Input
                    type={'text'}
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
              </span>
              <span className="w-full relative">
                <Input
                  type={isHidePassword ? 'password' : 'text'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span
                  className="absolute top-4 right-2"
                  onClick={changeIsHidePassword}
                >
                  {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </span>

              <Button className="w-full" onClick={(e) => handleClickLogin(e)}>
                Login
              </Button>
            </Form>
          </LogInContainer>

          <OverlayContainer logIn={logIn}>
            <Overlay logIn={logIn}>
              <LeftOverlayPanel logIn={logIn}>
                <Avatar
                  sx={{ height: 356, width: 350 }}
                  variant="rounded"
                  src="https://savani.vn/images/config/frame_1643271037.svg"
                ></Avatar>
                <Paragraph>
                  To login please enter your personal information
                </Paragraph>
                <GhostButton
                  onClick={() => {
                    toggle(true);
                  }}
                >
                  Login
                </GhostButton>
              </LeftOverlayPanel>

              <RightOverlayPanel logIn={logIn}>
                <Avatar
                  sx={{ height: 356, width: 350 }}
                  variant="rounded"
                  src="https://savani.vn/images/config/frame_1643271037.svg"
                ></Avatar>
                <Paragraph>
                  Become a member to receive many attractive offers
                </Paragraph>
                <GhostButton onClick={() => toggle(false)}>
                  Register
                </GhostButton>
              </RightOverlayPanel>
            </Overlay>
          </OverlayContainer>
        </Container>
      </div>
    </div>
  );
}

export default LoginRegister;
