import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountContext } from "../Authentication/Accounts";
import { apiURL, User, updateuser} from '../../Configs/config'
import Container from '@mui/material/Container';
import axios from 'axios';
const theme = createTheme();

export default function MyAccount() {

  const { getSession } = useContext(AccountContext);
  
  const [firstname, setfirstname] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [mobile, setmobile] = React.useState("");

  const [userId, setuserId] = React.useState();

  useEffect(() => {

    getSession().then((data) => {
      // console.log('Profile Session', data)
      setuserId(data['accessToken']['payload']['username']);
      console.log(data['accessToken']['payload']['username'])
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (userId?.length > 0) {
      console.log('loggedInUserId', userId);
      axios.get(apiURL + User + "?userId=" + userId).then((response) => {
        console.log(response);
        setfirstname(response['data']['firstName']);
        setlastname(response['data']['lastName']);
        setmobile(response['data']['mobile']);
        setemail(response['data']['userEmail']);

        setTimeout(() => {
        }, 5000);

        console.log('getuser', response);

      }, (error) => {
        console.log(error);
      });
    }
  }, [userId]);

  const saveUserDetails = () => {
    console.log(apiURL + User + "?userId=" + userId)
    if (userId?.length > 0) {
      axios.post(apiURL + "/updateuser?userId=" + userId, {
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
      })
        .then((res) => {
          console.log(res.data);
          alert("Information Saved Successfully")
        }
          , (error) => {
            console.log(error);
          });
    }
    else {
      alert("Something went wrong while saving the data. Please try again!")
    }

  }
  const handleChangeInFirstName = (event) => {

    const {
      target: { value },
    } = event;

    setfirstname(value);

  };
  const handleChangeInLastName = (event) => {

    const {
      target: { value },
    } = event;

    setlastname(value);

  };
  const handleChangeInMobile = (event) => {
    const {
      target: { value },
    } = event;
    setmobile(value);
  };

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

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeInFirstName}
                  autoComplete="given-name"
                  name="firstName"
                  value={firstname}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeInLastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeInMobile}
                  required
                  fullWidth
                  value={mobile}
                  id="mobile"
                  label="Mobile No."
                  name="mobile"
                  autoComplete="mobile number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  value={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={saveUserDetails}
            >
              Save Details
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}