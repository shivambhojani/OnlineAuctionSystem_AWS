import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { Box, Paper, Grid, FormControl } from "@mui/material"

function Profile() {



    const location = useLocation();

    const [data, setData] = useState({});

    useEffect(() => {
        setData(location.state.FormData);
    })

    return (

        <div style={{ display: "flex", height: "100%" }} >
            <Box style={{
                margin: "auto", width: 500, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
            }}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >

                <Paper elevation={3} sx={{p:5}}>
                    <Grid container spacing={3}>
                       
                        <Grid item xs={12}>
                            <h3 style={{
                                fontFamily: "Monaco",
                                fontWeight: "bold", fontStyle: "oblique", color: "purple", textAlign: "center"
                            }}> USER PROFILE </h3>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>User Name </h2>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>{data.firstName + "   " +data.lastName}</h2>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>Email </h2>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>{data.email}</h2>
                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </div >
    )
}

export default Profile