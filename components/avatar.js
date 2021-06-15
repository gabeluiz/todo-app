import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useSession } from 'next-auth/client';

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
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function ImageAvatar() {
  const classes = useStyles();
  const [session, loading] = useSession();

  return (
    <div className={classes.root}>
      <Avatar alt={session.user.name} src={session.user.image} className={classes.large} />
    </div>
  );
}