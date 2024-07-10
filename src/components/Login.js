import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/register-hook';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { Login } = useAuth();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        Login(data);
        navigate('/login');

    };

    return (
        <Container maxWidth="xs">
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                {...register('email', { required: 'Email is required' })}
                                error={!!errors.email}
                                helperText={errors.email && errors.email.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                error={!!errors.password}
                                helperText={errors.password && errors.password.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                LOGIN
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
