import Meta from '../components/meta';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Footer from './footer';
import Container from './container';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Layout({ children }) {

  const classes = useStyles();

  return (
    <>
      <Meta />
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Container>
          {children}
        </Container>
      </div>
      <Footer />
    </>
  )
}