import { getSession } from 'next-auth/client'

async function FirstLogin() {
    const session = await getSession();


    console.log(session);
}

export default FirstLogin();