import React from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
  }
}));

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
              Registration
            </Typography>

            <Box mb={4}>
              <TextField
                required
                id="email"
                label="E-mail"
                fullWidth
                margin="normal"
              />

              <TextField
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                margin="normal"
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
              >
                Sign up
              </Button> 
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

RegisterPage.getInitialProps = () => {
  return {};
};

export default RegisterPage;
