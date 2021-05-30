import React from 'react';
import Layout from '../components/layout.js';

//User SESSION
import { useSession } from 'next-auth/client';

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
    </Layout>
  )
}

export default Home;