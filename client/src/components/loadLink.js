import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { updateUser, updateColumns } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { instance } from '../config/config'

function getUrlVars() {
  var vars = {}
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value
  })
  return vars
}

class loadlink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }

    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount() {
    var hash = getUrlVars()['hash']
    this.fetchUser(hash, this.props.updateColumns, this.props.updateUser)
    this.id = setTimeout(() => this.setState({ redirect: true }), 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  fetchUser(hash, updateColumns, updateUser) {
    instance
      .get('api/retrieveSave', {
        params: { hash: hash }
      })
      .then(function(response) {
        updateUser({
          ...response.data.userState.user,
          isAuthenticated: false
        })
        updateColumns(response.data.userState.columns)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    return this.state.redirect ? (
      <Switch>
        <Redirect from="/shareableLink" to="/" />
        {this.forceUpdate()}
      </Switch>
    ) : (
      <div>Loading</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateColumns: state => dispatch(updateColumns(state)),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(loadlink)
)
