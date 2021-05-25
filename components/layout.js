import Meta from '../components/meta';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    }
  }));

export default function Layout({ children }) {

    const classes = useStyles();

  return (
    <>
      <Meta />
      <div className={classes.root}>{children}</div>
    </>
  )
}