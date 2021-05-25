
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  }));

export default function Container({ children }) {

    const classes = useStyles();
    return <main className={classes.content}>{children}</main>
}
  