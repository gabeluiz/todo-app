import { useRouter } from 'next/router';
import useSwr from 'swr';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import { makeStyles } from '@material-ui/core/styles';
import InputItem from '../../components/input-item';
import ListTask from '../../components/list-item';

//Fetch data
// import { mutate as mutateGlobal } from 'swr';
// import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles((theme) => ({

}));

export default function List() {

  const router = useRouter();
  const classes = useStyles();


  // const { data, error, mutate } = useFetch(router.query.id ? `/api/list/${router.query.id}` : null);

  // if (error) return <div>Failed to load list</div>
  // if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Toolbar />
      <ListTask />
    </Layout >
  )

}