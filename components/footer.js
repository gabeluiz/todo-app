import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" display="block" color="inherit" align="center" gutterBottom>
            {'Powered by '}
            <MuiLink color="inherit" target="_blank" href="https://www.linkedin.com/in/gabeluiz">
              Gabriel Palioqui
            </MuiLink>{' & '}
            <MuiLink color="inherit" target="_blank" href="https://www.linkedin.com/in/rodrigo-manozzo-715a8273">
              Rodrigo Manozzo
            </MuiLink>{' '}
            {' - Copyright © '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}