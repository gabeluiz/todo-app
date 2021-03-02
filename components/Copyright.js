import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Typography variant="caption" display="block" color="text" align="center" gutterBottom>
      {'Powered by '}
      <MuiLink color="inherit" target="_blank" href="https://www.linkedin.com/in/rodrigo-manozzo-715a8273/">
        Rodrigo Manozzo
      </MuiLink>{' '}
      {' e '}
      <MuiLink color="inherit" target="_blank" href="https://www.linkedin.com/in/gabeluiz">
        Gabriel Palioqui
      </MuiLink>{' '}
      {' - Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}