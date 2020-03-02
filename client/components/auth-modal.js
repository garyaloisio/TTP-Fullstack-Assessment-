import React, {Component} from 'react'
import {Login, Signup} from '../components'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

const styles = () => ({
  paper: {
    position: 'absolute',
    height: 350,
    width: 400,
    backgroundColor: '#E4E9FE',
    borderRadius: '10px',
    padding: '2%'
  }
})

class AuthModal extends Component {
  constructor() {
    super()
    this.state = {
      modalStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      openLogin: false,
      openSignup: false
    }
    this.handleOpenLogin = this.handleOpenLogin.bind(this)
    this.handleCloseLogin = this.handleCloseLogin.bind(this)
    this.handleOpenSignup = this.handleOpenSignup.bind(this)
    this.handleCloseSignup = this.handleCloseSignup.bind(this)
  }

  handleOpenLogin() {
    this.setState({openLogin: true})
  }

  handleCloseLogin() {
    this.setState({openLogin: false})
  }

  handleOpenSignup() {
    this.setState({openSignup: true})
  }

  handleCloseSignup() {
    this.setState({openSignup: false})
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        <Button color="#212121" onClick={this.handleOpenLogin}>
          Log In
        </Button>
        <Button color="#212121" onClick={this.handleOpenSignup}>
          Sign Up
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openLogin}
          onClose={this.handleCloseLogin}
        >
          <div style={this.state.modalStyle} className={classes.paper}>
            {/* <h2 id="simple-modal-title">Log In</h2> */}
            <div id="simple-modal-description">
              <Login />
            </div>
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openSignup}
          onClose={this.handleCloseSignup}
        >
          <div style={this.state.modalStyle} className={classes.paper}>
            {/* <h2 id="simple-modal-title">Sign Up</h2> */}
            <div id="simple-modal-description">
              <Signup />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

AuthModal.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AuthModal)
