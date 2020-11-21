import { Container, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

interface RedirectionProps {
  title: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(8),
    textAlign: 'center',
  },
}));

export const Redirection = ({ title }: RedirectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
            >
              {title}
            </Typography>

            will be redirected after 5 seconds...
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
