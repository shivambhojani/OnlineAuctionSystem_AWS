import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box, Paper } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Cards from '@mui/material';
import Image from '../../src/assets/online_auction.jpeg'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import { AccountContext } from "./Authentication/Accounts";
import { apiURL, User, updateuser} from '../Configs/config'

import axios from 'axios';

export default function Posts(props) {

    const [productsFetched, setProductsFetched] = useState(false);

    const [currentbid, setcurrentbid] = useState('');

    const [baseprice, setbaseprice] = useState('');

    const [highestbid, sethighestbid] = useState('');

    const [search, setSearch] = useState('');

    const [products, setProducts] = useState('');
    const [userId, setuserId] = React.useState();
    const { getSession } = useContext(AccountContext);
  
    useEffect(() => {
  
      getSession().then((data) => {
        // console.log('Profile Session', data)
        setuserId(data['accessToken']['payload']['username']);
        console.log(data['accessToken']['payload']['username'])
      }).catch((err) => {
        console.log(err);
      });
    }, []);

    const baseUrl = "https://dec7ccapye.execute-api.us-east-1.amazonaws.com/prod/"
    useEffect(() => {
        let url = baseUrl + '/auction-products';
        if (!productsFetched) {
            axios.get(url).then(result => {
                setProducts(result.data.products);

            })
            setProductsFetched(true);
        }
        let bprice = "40";
        setbaseprice("Base Price: " + bprice + "CAD")

        let hprice = "100";
        sethighestbid("Highest Bid Price: " + hprice + "CAD")
    });

    const saveBid = (highestbid, issold, productId) => {
        if (userId?.length > 0) {
          axios.put(baseUrl + "/bid" + "?productId=" + productId, {
            highestbid: highestbid,
            highestbidderid: userId,
            sold: issold,
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

    function placebid(hbid, highestsellingamount, productId) {
        let bid = +currentbid;
        hbid = +hbid;
        highestsellingamount = +highestsellingamount;
        console.log(bid)
        console.log(hbid)

        if (bid > hbid) {
            if (bid >= highestsellingamount) {
                saveBid(bid,true,productId);
                alert("Congrats! - Product Bought");
            }
            else{
                saveBid(bid,false,productId);
                alert("Congrats! - You have the highest Bid on this product.");
            }
        }
        else {
            alert("Bidding amount cannot be less than the current highest bid")
        }

    }
    const onChangeBid = (event) => {

        const {
            target: { value },
        } = event;

        setcurrentbid(value);
        console.log(currentbid);

    };


    return (

        <Grid container direction="row" spacing={2} columns={12}
        >
            <Grid
                container
                style={{ padding: 20 }}
                alignItems="center"
                justifyContent="center"
                // className="bg-gray padding-ub"
                rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 7 }}
                columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 6, xl: 8 }}>
                {products?.length ? products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product, index) => (
                    <Grid item xl={3} lg={4} md={6} sm={6} xs={11} key={index}>
                        <Card elevation={7}>
                            <CardMedia
                                component="img"
                                height="150"
                                width="150"
                                margin="15px auto 15px auto"
                                image={Image}
                                alt={product.productId}
                            />
                            <CardContent>
                                <Typography align="center" gutterBottom variant="h6" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    <b>{product.name}</b>
                                </Typography>
                                <Typography align="center" gutterBottom variant="subtitle1" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    <b>Price: $</b>{product.baseprice}
                                </Typography>
                                <Typography align="left" gutterBottom variant="body2" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    {product.description}
                                </Typography>
                                <Stack spacing={1} alignItems="center">
                                    <Stack direction="row" spacing={1}>
                                        <Chip label={"Base Price: " + product.baseprice} color="primary" />
                                        <Chip label={"Highest Bid: " + product.highestbid} color="success" />
                                    </Stack>
                                    <div>
                                        <Stack spacing={1} alignItems="center">
                                            <TextField id="outlined-basic" label="Bidding Price" variant="outlined" onChange={onChangeBid} />
                                            <Button variant="contained"
                                                onClick={() => placebid(product.highestbid, product.highestsellingamount, product.productId)}>Place Bid</Button>
                                        </Stack>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                    : null}
            </Grid>

        </Grid>

    )

}

