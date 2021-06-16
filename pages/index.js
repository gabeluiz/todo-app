import React from 'react';
import Layout from '../components/layout';
import Toolbar from '../components/toolbar';
import { makeStyles } from '@material-ui/core/styles';
//User SESSION
import { useSession } from 'next-auth/client';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

function Home() {

  const [session, loading] = useSession();
  const classes = useStyles();

  return (
    <Layout>
      <Toolbar />
      {!session && (
        <>
          <Typography variant="h5">
            Login
          </Typography>
          <Typography variant="subtitle2">
            You must be signed in to view this page
          </Typography>
        </>
      )}
      {session && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Welcome
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </Layout>
  )
}

export default Home;