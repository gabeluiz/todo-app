import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import ListTask from '../../components/list-task';

export default function List() {

  return (
    <Layout>
      <Toolbar />
      <ListTask />
    </Layout >
  )

}