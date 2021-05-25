import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  }
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="caption" display="block" color="inherit" align="center" gutterBottom>
        {'Powered by '}
        <MuiLink color="inherit" target="_blank" href="https://www.linkedin.com/in/gabeluiz">
          Gabriel Palioqui
        </MuiLink>{' '}
        {' - Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}