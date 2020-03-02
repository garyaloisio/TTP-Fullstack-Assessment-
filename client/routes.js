import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Home, SignupPage, Profile} from './components'
import {me} from './store'
import {withStyles} from '@material-ui/styles'
import Box from '@material-ui/core/Box'

const headerHeight = 70

const styles = () => ({
  content: {
    marginTop: headerHeight
  }
})

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {accountCreated, signupCompleted, classes} = this.props

    return (
      <Box className={classes.content}>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Home} />
          {/* <Route path="/face-api" component={FaceapiTest} />
          <Route path="/upload-bw-face" component={UploadBWFace} />
          <Route path="/create-face" component={CreateFace} /> */}
          {/* <Route path="/matches" component={Matches} /> */}
          {accountCreated &&
            signupCompleted && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                {/* <Route path="/matches" component={Matches} /> */}
                <Route path="/profile" component={Profile} />
              </Switch>
            )}
          {accountCreated &&
            !signupCompleted && (
              <Switch>
                {/* Routes here are available for users who have not created an account or have not completed sign up */}
                {/* <Route path="/signup" component={SignupPage} /> */}
                <Route path="/profile" component={Profile} />
              </Switch>
            )}
          {/* Displays our Login component as a fallback */}
          <Route component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id,
    accountCreated: !!state.user.id,
    signupCompleted: !!state.user.createdFaceDesc
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(
  withRouter(connect(mapState, mapDispatch)(Routes))
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired,
  accountCreated: PropTypes.bool.isRequired,
  signupCompleted: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
