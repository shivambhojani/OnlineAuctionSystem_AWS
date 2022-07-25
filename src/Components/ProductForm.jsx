import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { AccountContext } from "../Components/Authentication/Accounts";

export default function ProductForm() {
  const { getSession } = useContext(AccountContext);

  const baseUrl = "https://dec7ccapye.execute-api.us-east-1.amazonaws.com/prod/";

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [baseprice, setbaseprice] = useState("");
  const [image, setImage] = useState("");
  const [highestsellingamount, sethighestsellingamount] = useState("");

  const [userId, setuserId] = React.useState();

  const navigate = useNavigate();

  useEffect(() => {

    getSession().then((data) => {
      // console.log('Profile Session', data)
      setuserId(data['accessToken']['payload']['username']);
      console.log(data['accessToken']['payload']['username'])
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleSubmit = (e) => {
    if (!image) {
      alert("Please upload image");
      return;
    }
    if (!productName || !productDescription || !baseprice) {
      alert("Please fill all the requried fields")
    }
    const data = {
      "name": productName,
      "description": productDescription,
      "baseprice": baseprice,
      "imgUrl": "",
      "productId": "",
      "sellerid":userId,
      "highestbidderid":"",
      "highestbid":"0",
      "sold":false,
      "timeatproductadd": new Date().getTime(),
      "timeathighestbid": "",
      "timewhensold": "",
      "imgString": image,
      "highestsellingamount": 0
    }
    axios.post(baseUrl + "product", data)
      .then(res => {
        console.log(res.statusText)
        alert("Product added Successfully");
        // window.location.reload(false);
      })
  };

  const imageHandler = (event) => {
    const img = event.target.files[0];
    const reader = new FileReader(img);
    reader.readAsDataURL(img);
    reader.onload = () => {
        setImage(reader.result);
    }
  }

  const fileSelectHandler = (e) =>{
    const img = e.target.files[0];
    const reader = new FileReader(img);
    reader.readAsDataURL(img);
    reader.onload = () => {
        setImage(reader.result);
        console.log(reader.result);
    }
}

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', image, image.name)
    // axios.post('url', fd).then(res => {
    //     console.log(res);
    // })
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Add Product
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* Name */}
              <TextField
                margin="normal"
                required
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                id="email"
                name="Product Name"
                label="Product name"
                autoFocus
              />
              {/* Description */}
              <TextField
                label="Product Description"
                value={productDescription}
                multiline
                fullWidth
                required
                rows={2}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              {/* price */}
              <TextField
                margin="normal"
                required
                type="number"
                fullWidth
                value={baseprice}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => setbaseprice(e.target.value)}
                name="baseprice"
                label="Baseprice"
              />
               {/* highest selling price */}
               {/* <TextField
                margin="normal"
                required
                type="number"
                fullWidth
                value={highestsellingamount}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => sethighestsellingamount(e.target.value)}
                name="highestsellingamount"
                label="Highest Selling Amount"
              /> */}
              {/* Image */}
              Add Image:
              <input
                accept="image/*"
                multiple
                type="file"
                onChange={imageHandler}
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}