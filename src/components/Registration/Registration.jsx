import React, { useState, useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";


function Registration() {

    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);

    const [error, setError] = useState({});

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        setError(validate(formData));
        setIsSubmit(true);
        
    };

    useEffect(() => {

        if (Object.keys(error).length === 0 && isSubmit) {
        
        navigate("/profile", { state: { FormData: formData } });
        
        }
        
        }, [error]);



    const regex_name = /^[A-Za-z]{2,}$/i;
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex_password = /^[A-Za-z0-9]{8,}$/;

    const validate = (values) => {
        const Formerrors = {};
        if (!values.firstName) {
            Formerrors.firstName = "First Name cannot be empty!";
        }
        else if (!regex_name.test(values.firstName)) {
            Formerrors.firstName = "Enter a valid First Name!"
        }
        if (!values.lastName) {
            Formerrors.lastName = "Last Name cannot be empty!";
        }
        else if (!regex_name.test(values.lastName)) {
            Formerrors.lastName = "Enter a valid Last Name!"
        }
        if (!values.email) {
            Formerrors.email = "Email id cannot be empty!";
        }
        else if (!regex_email.test(values.email)) {
            Formerrors.email = "Enter a valid email format!";
        }
        if (!values.password) {
            Formerrors.password = "Password cannot be empty!";
        }
        else if (!regex_password.test(values.password)) {
            Formerrors.password = "Password should be minimum of 8 characters!"
        }
        if (!values.confirmPassword) {
            Formerrors.confirmPassword = "Confirm Password cannot be empty!";
        }
        else if (!(values.password === values.confirmPassword)) {
            Formerrors.confirmPassword = "Password and Confirm Password!"
        }

        return Formerrors
    }

    return (
            <Box style={{
                margin: "auto", width: 500, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
            }}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <Paper elevation={16} sx={{p:5, m:5}}>
                        <h3 style={{
                            fontFamily: "Monaco",
                            fontWeight: "bold", fontStyle: "oblique", color: "purple", textAlign: "center"
                        }}>PROFILE REGISTRATION</h3>
                        <TextField
                            name="firstName"
                            label="First Name"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}

                        />
                        <p style={{ color: "red" }}>{error.firstName}</p>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <p style={{ color: "red" }}> {error.lastName}</p>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}

                        />
                        <p style={{ color: "red" }}> {error.email}</p>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}

                        />
                        <p style={{ color: "red" }}> {error.password}</p>
                        <TextField
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}

                        />
                        <p style={{ color: "red" }}>{error.confirmPassword}</p>
                        <Box textAlign='center'>

                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        </Box>
                </Paper>
            </Box>
    )
}

export default Registration