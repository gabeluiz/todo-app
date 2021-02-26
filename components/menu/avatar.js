import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();
  const [session, loading] = useSession();

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={session.user.image} style={{ borderRadius: "50%" }} className={classes.small} />
    </div>
  );
}