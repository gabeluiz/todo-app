import React from 'react';
import Layout from '../components/layout.js';

//User SESSION
import { useSession } from 'next-auth/client';
import { Typography } from '@material-ui/core';

function Home() {

  const [session, loading] = useSession();

  return (
    <Layout>
      {!session && (
        <>
          <h1>LOGIN</h1>
          <p>You must be signed in to view this page</p>
        </>
      )}
      {session && (
        <>
          <Typography variant="h6" noWrap>
            Welcome
          </Typography>
        </>
      )}
    </Layout>
  )
}

export default Home;