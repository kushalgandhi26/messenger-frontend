import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useNavigate } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import Error from './Error';
import Welcome from './Welcome';
import Chatcontainer from './Chatcontainer';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));


export default function Home({ loggedIn, setloggedIn }) {
  const [allusers, setallusers] = useState([])
  const [user, setuser] = useState({ _id: "", name: "", email: "", token: "" })
  const [currentuser, setcurrentuser] = useState(undefined)
  const [click, setclick] = useState(true)
  const [title, settitle] = useState("Chats")

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user_data = JSON.parse(localStorage.getItem("user"))
      setuser({ _id: user_data.user._id, name: user_data.user.name, email: user_data.user.email, token: user_data.token })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [user])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/getUsers/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': user.token
        }
      })
      const response = await res.json();
      setallusers(response)
    } catch (err) {
      console.log(err)
    }
  }

  const selectUser = (user) => {
    setcurrentuser(user)
    setclick(false)
    settitle(user.name)
  }

  const classes = useStyles();
  const [openContacts, setOpenContacts] = useState(true);
  const handleDrawerOpen = () => {
    setOpenContacts(true);
  };
  const handleDrawerClose = () => {
    setOpenContacts(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  const navigate = useNavigate()
  const handleLogout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user")
      setloggedIn(false)
      setOpen(false);
      navigate("/")
    }
  }

  //Menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      {!loggedIn && <Error message={"Please Login"} />}
      {
        loggedIn && <>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, openContacts && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, openContacts && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {title}
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar alt={user.name} src="/static/images/avatar/1.jpg" style={{ marginLeft: "20px", cursor: "pointer" }} className={classes.large} ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle} />
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem> */}
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !openContacts && classes.drawerPaperClose),
            }}
            open={openContacts}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            {allusers.map((element) => {
              return (
                <ListItem onClick={() => selectUser(element)} key={element._id} button>
                  <ListItemIcon>
                    <Avatar alt={element.name} src="/static/images/avatar/1.jpg" className={classes.small} />
                  </ListItemIcon>
                  <ListItemText primary={element.name} />
                </ListItem>
              )
            })}

            {/* <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List> */}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/* <Container maxWidth="lg" className={classes.container}> */}
            {click && <Welcome />}
            {!click && <Chatcontainer user={user} selectedUser={currentuser}/>}
            {/* </Container> */}
          </main>
        </>
      }
    </div >
  );
}