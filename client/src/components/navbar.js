import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Avatar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import Routes from '../Routes'
import ClientIds from '../config/config'
import { updateUser, updateColumns } from '../actions/simpleAction'
import { url, instance } from '../config/config'

function encrypt(text) {
  var secretHash = new Buffer(text)
  var secretSecretHash = new Buffer(secretHash.toString('base64'))
  return secretSecretHash.toString('base64')
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  login: {
    right: 10,
    position: 'absolute'
  },
  logout: {
    right: 5,
    top: 13,
    position: 'absolute'
  },
  toolbar: {
    backgroundColor: '#434343'
  },
  shareState: {
    right: 90,
    top: 13,
    position: 'absolute'
  },
  signup: {
    right: 80,
    position: 'absolute'
  },
  avatar: {
    left: 35,
    top: 10,
    position: 'absolute'
  },
  userName: {
    left: 100,
    top: 16,
    position: 'absolute',
    text: theme.palette.secondary
  }
})

const Navbar = ({ classes, userState, updateUser, updateColumns }) => {
  function copyToClipboard(user) {
    navigator.clipboard
      .writeText(url + 'shareableLink?hash=' + encrypt(user.email))
      .then(function() {
        alert('Copied Link!')
      })
  }

  function login(user) {
    instance
      .get('api/retrieveSave', {
        params: { email: user.profileObj.email }
      })
      .then(function(response) {
        if (response.data) {
          updateColumns(response.data.userState.columns)
        }
        updateUser({ ...user.profileObj, isAuthenticated: true })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  function logout(user) {
    updateUser({ ...user.profileObj, isAuthenticated: false })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {!userState.user.isAuthenticated && (
            <GoogleLogin
              onSuccess={user => login(user)}
              onFailure={console.log}
              clientId={ClientIds.GOOGLE_CLIENT_ID}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  className={classes.login}
                  color="inherit"
                >
                  Login with Google
                </Button>
              )}
            />
          )}
          {userState.user.isAuthenticated && (
            <div>
              <Avatar
                src={userState.user.imageUrl}
                className={classes.avatar}
                component={Link}
                to="/profile"
              />
              <Typography
                className={classes.userName}
                variant="h6"
                color="inherit"
              >
                {userState.user.firstName
                  ? userState.user.firstName
                  : userState.user.givenName}
              </Typography>
              {
                <Button
                  onClick={() => copyToClipboard(userState.user)}
                  variant="h6"
                  color="inherit"
                  className={classes.shareState}
                >
                  Share
                </Button>
              }
              {
                <Button
                  onClick={() => logout(userState.user)}
                  variant="h6"
                  color="inherit"
                  className={classes.logout}
                >
                  Logout
                </Button>
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Routes />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userState: state.simpleReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: user => dispatch(updateUser(user)),
    updateColumns: state => dispatch(updateColumns(state))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar))
