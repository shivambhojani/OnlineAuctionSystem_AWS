import React, { FC } from 'react';
import './Registration.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

interface RegistrationProps { }

const Registration: FC<RegistrationProps> = () => {
  const [firstName, setFirstName] = React.useState<String>("");
  const [lastName, setLastName] = React.useState<String>("");
  const [email, setEmail] = React.useState<String>("");
  const [password, setPassword] = React.useState<String>("");
  const [confirmPassword, setConfirmPassword] = React.useState<String>("");

  const [errors, setErrors] = React.useState<{ firstName: string }>();
  const [lastNameerror, setLastNameError] = React.useState<{ lastName: string }>();
  const [emailError, setEmailError] = React.useState<{ email: string }>();
  const [passwordError, setPasswordError] = React.useState<{ password: string }>();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<{ confirmPassword: string }>();

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setErrors({ firstName: '' })
    setFirstName(value);
    let reg = /^[a-zA-Z]+$/.test(value)
    if (!reg) {
      setErrors({ firstName: 'Only letters are allowed' });
    }
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setLastNameError({ lastName: '' })
    setLastName(value);
    let reg = /^[a-zA-Z]+$/.test(value)
    if (!reg) {
      setLastNameError({ lastName: 'Only letters are allowed' });
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setEmailError({ email: '' })
    setEmail(value);
    let reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
    if (!reg) {
      setEmailError({ email: 'Please enter valid email' });
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setPasswordError({ password: '' })
    setPassword(value);
    if (value.length < 8) {
      setPasswordError({ password: 'Please enter minimum 8 characters for password' });
    }
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    setConfirmPasswordError({ confirmPassword: '' })
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError({ confirmPassword: 'Password should match the above password' });
    }
  }
  const navigate = useNavigate();
  const buttonClicked = () => {
    navigate('/profile')
  }

  return (
    <div className='p-16'>
      <h2>Registration form</h2>
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-6 col-lg-3 container-box">
          <div className="m-tb-8 ">
            <TextField
              required
              fullWidth 
              autoComplete="off"
              id="outlined-number"
              value={firstName}
              label="First Name"
              onChange={handleFirstNameChange}
              error={Boolean(errors?.firstName)}
              helperText={(errors?.firstName)}
            />
          </div>
          <div className="m-tb-8">
            <TextField
              required
              fullWidth
              autoComplete="off"
              id="outlined-number"
              value={lastName}
              label="Last Name"
              onChange={handleLastNameChange}
              error={Boolean(lastNameerror?.lastName)}
              helperText={(lastNameerror?.lastName)}
            />
          </div>
          <div className="m-tb-8">
            <TextField
              required
              fullWidth
              autoComplete="off"
              id="outlined-number"
              value={email}
              label="Email"
              type="email"
              onChange={handleEmailChange}
              error={Boolean(emailError?.email)}
              helperText={(emailError?.email)}
            />
          </div>
          <div className="m-tb-8">
            <TextField
              required
              fullWidth
              autoComplete="off"
              id="outlined-number"
              value={password}
              label="Password"
              type="password"
              onChange={handlePasswordChange}
              error={Boolean(passwordError?.password)}
              helperText={(passwordError?.password)}
            />
          </div>
          <div className="m-tb-8">
            <TextField
              required
              fullWidth
              autoComplete="off"
              id="outlined-number"
              value={confirmPassword}
              label="Confirm password"
              type="password"
              onChange={handleConfirmPasswordChange}
              error={Boolean(confirmPasswordError?.confirmPassword)}
              helperText={(confirmPasswordError?.confirmPassword)}
            />
          </div>
          <div className="search-btn">
            <Button disabled={!firstName || !lastName || !email || !password || !confirmPassword ||Boolean(errors?.firstName) || 
            Boolean(lastNameerror?.lastName) || Boolean(emailError?.email) || Boolean(passwordError?.password) || Boolean(confirmPasswordError?.confirmPassword)}
              type="button" variant="contained" onClick={() => buttonClicked()}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Registration;
