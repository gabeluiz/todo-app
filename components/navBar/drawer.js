import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiObjects from '@material-ui/icons/EmojiObjects';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signIn, useSession } from 'next-auth/client';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.secondary.main,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    listItemText: {
        fontSize: 16,
        fontWeight: 400,
    },
    listItem: {
        paddingTop: 4,
        paddingBottom: 4,
        color: theme.palette.primary.main,
    },
}));

function ClippedDrawer(props) {

    const classes = useStyles();
    const [session, loading] = useSession();
    const [openDrawer, setOpernDrawer] = React.useState(false);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            open={openDrawer}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                {session && <> {' '}
                    <List>
                        <ListItem button classes={{ root: classes.listItem }}>
                            <ListItemIcon>{<EmojiObjects color='primary' />}</ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.listItemText
                            }}
                                primary={'Notas'}
                            />
                        </ListItem>
                    </List>
                    <Divider />
                </>}
                <Box p={10}>
                    <Box nt={2}>
                        {!session && <> {' '}
                            <Button
                                startIcon={<AccountCircle />}
                                variant="outlined"
                                color="primary"
                                onClick={() => signIn('google')}
                            >
                                Login
                        </Button>
                        </>}
                    </Box>
                </Box>
            </div>
        </Drawer>
    );
}

export default ClippedDrawer;