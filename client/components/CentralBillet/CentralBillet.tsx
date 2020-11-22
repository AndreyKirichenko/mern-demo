import { ReactNode } from 'react';
import { Container, Grid, Paper, Typography, makeStyles, GridSize } from '@material-ui/core';

interface CentralBilletProps {
  children?: ReactNode | null;
  lg?: GridSize;
  md?: GridSize;
  sm?: GridSize;
  title?: string;
  xs?: GridSize;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(8),
    textAlign: 'center',
  },
}));

export const CentralBillet = ({
  children = null,
  lg = 6,
  md = 6,
  sm = 8,
  title,
  xs = 12,
}: CentralBilletProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
          <Paper className={classes.paper}>
            {title && (
              <Typography
                component="h1"
                variant="h5"
                align="center"
              >
                {title}
              </Typography>
            )}

            {children}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
