import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

require('../../secrets')

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetch(
      'https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb,NFLX,MSFT&types=quote&token=Tsk_da97a448e3844b76802a78d28c5d65b1'
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
  }

  async handleClick(stockName, price, quantity, id, budget) {
    await axios.post('/api/portfolio', {
      stock: stockName,
      quantity: quantity,
      price: price * quantity,
      userId: this.props.id,
      budget: this.props.budget
    })
    console.log(stockName, price, quantity, id, budget)
  }

  render() {
    const {email} = this.props
    const {budget} = this.props
    const {error, isLoaded, items} = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      let values = Object.values(items)
      values.forEach(stock => {
        console.log(stock.quote.symbol)
        console.log(stock.quote.companyName)
        console.log(stock.quote.latestPrice)
      })
      return (
        <div>
          <h1>Welcome {email}</h1>
          <h1>Budget: {budget}</h1>
          <div>
            {values.map(stock => (
              <h2 key={stock.quote.symbol}>
                {stock.quote.companyName}
                <ul>
                  Ticker Symbol: {stock.quote.symbol}
                  <br />
                  Price Per Share: {stock.quote.latestPrice}
                </ul>
                <form onSubmit={this.handleClick}>
                  <label>Quantity:</label>
                  <select
                    type="text"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  >
                    <option>{1}</option>
                    <option>{2}</option>
                    <option>{3}</option>
                    <option>{4}</option>
                    <option>{5}</option>
                  </select>
                </form>
                <button
                  onClick={() =>
                    this.handleClick(
                      stock.quote.symbol,
                      stock.quote.latestPrice,
                      this.state.quantity,
                      this.props.id,
                      this.props.budget
                    )
                  }
                >
                  Buy
                </button>
              </h2>
            ))}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    budget: state.user.budget,
    id: state.user.id
  }
}

export default connect(mapState, null)(Profile)

Profile.propTypes = {
  email: PropTypes.string,
  budget: PropTypes.number,
  id: PropTypes.number
}
