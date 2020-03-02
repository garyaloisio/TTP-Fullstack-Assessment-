import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class UserHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log(this.props)

    return <div>hello</div>
  }
}

const mapState = state => {
  return {
    email: state.user.email
    // stock: state.portfolio.stock.userId
  }
}

export default connect(mapState, null)(UserHistory)

UserHistory.propTypes = {
  email: PropTypes.string
  // stock: PropTypes.string
}
