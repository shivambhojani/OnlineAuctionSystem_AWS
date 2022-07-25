import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { apiURL, User } from '../../Configs/config'
import axios from 'axios';
import { toast } from 'react-toastify';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const createSubscriptionAPI = 'https://dec7ccapye.execute-api.us-east-1.amazonaws.com/prod/email/create-subscription';

  // const notify = (type, msg) => {
  //   if (type === 'success') {
  //     toast.success(
  //       msg,
  //       { position: toast.POSITION.TOP_RIGHT }
  //     );

  //   } else if (type === 'error') {
  //     toast.error(
  //       msg,
  //       { position: toast.POSITION.TOP_RIGHT }
  //     );

  //   }
  // };

  const handleSubmit = (event) => {
    Amplify.configure({
      Auth: UserPool.pooldata,
    });

    console.log("Function called")

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let password = data.get('password')
    let firstname = data.get('firstName')
    let lastname = data.get('lastName')
    let mobile = data.get('mobile')

    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    //   try {
    //       Auth.signUp({
    //       username: email,
    //       password: password,
    //       attributes: {
    //         email,
    //         firstname,
    //         lastname,
    //         phone_number: mobile,
    //       },
    //     });
    //     alert("Success!!");
    //     history.push("/confirmation");
    //   } catch (error) {
    //     console.error(error);
    //     alert("Error!!", error.message, "danger");
    //   }
    //   setLoading(false);
    // };


    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        let userId = data['userSub']
        console.log(userId);
        // console.log(data);
        axios.post(createSubscriptionAPI, {
          "topicName": userId,
          "userEmail": email
        }).then((response) =>
          console.log(response)
        )

        addUserIntoDB(userId, firstname, lastname, email, mobile)

        alert('User Registered Successfully');
        alert("Please confirm your subscription to get emails about the articles you've added and notifying you when you win a product auction.");
        navigate('/signin')
      }
    });
  }

  const addUserIntoDB = (userId, firstname, lastname, email, mobile) => {

    let url = apiURL + User;

    axios.post(url, {
      userId: userId,
      userEmail: email,
      firstName: firstname,
      lastName: lastname,
      mobile: mobile
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  //   Auth.signUp({
  //     username: email,
  //     password: password,
  //     attributes: {
  //       email,
  //       firstname,
  //       lastname,
  //       phone_number: mobile
  //     },
  //   });
  // };

  // console.log({
  //   Email: email,
  //   password: password,
  //   firstname: firstname,
  //   lastname: lastname,
  //   mobile: mobile
  // });


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile No."
                  name="mobile"
                  autoComplete="mobile number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}