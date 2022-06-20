import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { Paper, Grid, Container } from "@mui/material"

function Profile() {

    const location = useLocation();

    const [data, setData] = useState({});

    useEffect(() => {
        setData(location.state.FormData);
    })

    return (
        <Container sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3 style={{
                            fontFamily: "Monaco",
                            fontWeight: "bold", fontStyle: "oblique", color: "purple", textAlign: "center"
                        }}> USER PROFILE </h3>
                    </Grid>
                    <Grid item xs={3} style={{textAlign:"start"}}>
                        <h2>User Name </h2>
                    </Grid>
                    <Grid item xs={3}>
                        <h2>{data.firstName + "   " + data.lastName}</h2>
                    </Grid>
                    <Grid item xs={3}>
                        hello
                    </Grid>
                    <Grid item xs={3}>
                        hello
                    </Grid>
                    <Grid item xs={3} style={{textAlign:"start"}}>
                        <h2>Email </h2>
                    </Grid>
                    <Grid item>
                        <h2>{data.email}</h2>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Profile