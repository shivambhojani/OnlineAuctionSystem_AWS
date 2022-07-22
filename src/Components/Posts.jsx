import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Cards from '@mui/material';
import Image from '../../src/assets/online_auction.jpeg'

import axios from 'axios';

export default function Posts(props) {
    const [productsFetched, setProductsFetched] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState('');
    const baseUrl = "https://dec7ccapye.execute-api.us-east-1.amazonaws.com/prod/"
    useEffect(() => {
        let url = baseUrl + '/auction-products';
        if(!productsFetched) {
            axios.get(url).then(result => {
                setProducts(result.data.products);
            })
            setProductsFetched(true);
        }
    });

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
                {products?.length? products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product, index) => (
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
                                    <b>Price: $</b>{product.price}
                                </Typography>
                                <Typography align="left" gutterBottom variant="body2" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                : null}
            </Grid>

        </Grid>

    )

}

