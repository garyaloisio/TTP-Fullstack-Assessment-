import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Box from '@material-ui/core/Box'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            style={{
              margin: '-3%',
              width: '100%'
            }}
          >
            {name === 'login' ? <h2>Log In</h2> : <h2>Sign Up</h2>}
          </Box>
          <TextField
            fullWidth
            name="email"
            type="text"
            variant="outlined"
            placeholder="Email"
            style={{
              marginLeft: '-4.5%'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              style: {
                backgroundColor: 'white'
              }
            }}
          />
          <TextField
            fullWidth
            name="password"
            variant="outlined"
            placeholder="Password"
            type="password"
            style={{
              marginLeft: '-4.5%'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              style: {
                backgroundColor: 'white'
              }
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: '4%',
              height: 50
            }}
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Box>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log in',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
