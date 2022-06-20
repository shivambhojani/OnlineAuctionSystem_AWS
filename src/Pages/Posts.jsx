import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Cards from '@mui/material';
import Image from '../../src/assets/online_auction.jpeg'



function Posts (props) 

{
    const [products, setProducts] = useState([
        { id: '1', name: 'Product Name 1', price: 12312, desc: 'Description text 1' },
        { id: '2', name: 'Product Name 2', price: 12312, desc: 'Description text 2' },
        { id: '3', name: 'Product Name 3', price: 12312, desc: 'Description text 3' },
        { id: '4', name: 'Product Name 4', price: 12312, desc: 'Description text 4' },
        { id: '5', name: 'Product Name 5', price: 12312, desc: 'Description text 5' },
        { id: '6', name: 'Product Name 6', price: 12312, desc: 'Description text 6' },
        { id: '7', name: 'Product Name 7', price: 12312, desc: 'Description text 7' },
        { id: '8', name: 'Product Name 8', price: 12312, desc: 'Description text 8' },
        { id: '9', name: 'Product Name 9', price: 12312, desc: 'Description text 9' },
        { id: '10', name: 'Product Name 10', price: 12312, desc: 'Description text 10' },
        { id: '11', name: 'Product Name 11', price: 12312, desc: 'Description text 11' },
        { id: '12', name: 'Product Name 12', price: 12312, desc: 'Description text 12' },
        { id: '13', name: 'Product Name 13', price: 12312, desc: 'Description text 13' },
        { id: '14', name: 'Product Name 14', price: 12312, desc: 'Description text 14' },
        { id: '15', name: 'Product Name 15', price: 12312, desc: 'Description text 15' },
        { id: '16', name: 'Product Name 16', price: 12312, desc: 'Description text 16' },
        { id: '17', name: 'Product Name 17', price: 12312, desc: 'Description text 17' },
        { id: '18', name: 'Product Name 18', price: 12312, desc: 'Description text 18' },
        { id: '19', name: 'Product Name 19', price: 12312, desc: 'Description text 19' },
        { id: '20', name: 'Product Name 20', price: 12312, desc: 'Description text 20' },
        { id: '21', name: 'Product Name 21', price: 12312, desc: 'Description text 21' },
        { id: '22', name: 'Product Name 22', price: 12312, desc: 'Description text 22' },
        { id: '23', name: 'Product Name 23', price: 12312, desc: 'Description text 23' },
    ]);
    const [search, setSearch] = useState('');

    return (

        <Grid container direction="row" spacing={2} columns={12}
        >
            <Grid
                container
                style={{ padding: 20 }}
                // height="100%"
                alignItems="center"
                justifyContent="center"
                // className="bg-gray padding-ub"
                rowSpacing={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 7 }}
                columnSpacing={{ xs: 1, sm: 2, md: 5, lg: 6, xl: 8 }}>
                {products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                    <Grid item xl={3} lg={4} md={6} sm={6} xs={11}>
                        <Card elevation={7}>
                            <CardMedia
                                component="img"
                                height="150"
                                width="150"
                                margin="15px auto 15px auto"
                                image={Image}
                                alt={product.id}
                            />
                            <CardContent>
                                <Typography align="center" gutterBottom variant="h6" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    {product.name}
                                </Typography>
                                <Typography align="center" gutterBottom variant="subtitle1" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    {product.price}
                                </Typography>
                                <Typography align="center" gutterBottom variant="body2" component="div"
                                    style={{ textTransform: 'capitalize' }}>
                                    {product.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>

        </Grid>

    )

}

export default Posts;
