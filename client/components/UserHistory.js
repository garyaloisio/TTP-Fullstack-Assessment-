import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Card, CardGroup} from 'react-bootstrap'

class UserHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: [],
      error: null,
      isLoaded: false,
      items: []
    }
    this.findItem = this.findItem.bind(this)
    this.listMyStocks = this.listMyStocks.bind(this)
  }

  async componentDidMount() {
    await axios.get(`api/portfolio/myport`).then(res => {
      const stocks = res.data
      this.setState({stocks})
    })
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
    // this.findItem(x, y)
  }

  findItem(valueOne, valueTwo) {
    let vOne = valueOne
    let vTwo = valueTwo
    let result = []
    if (!vOne || !vTwo) {
      return 'loading'
    } else {
      for (let i = 0; i < vTwo.length; i++) {
        if (vOne === vTwo[i].quote.symbol) {
          console.log('BASNS', vTwo[i].quote.latestPrice)
          return Number.parseFloat(vTwo[i].quote.latestPrice).toFixed(2)
        }
      }
    }
  }

  listMyStocks(portfolio, json) {
    let obj = {}
    let string = []
    console.log('the portfolio', portfolio)
    for (let i = 0; i < portfolio.length; i++) {
      let num = Number(portfolio[i].quantity)
      if (obj[portfolio[i].stock] === undefined) {
        obj[portfolio[i].stock] = num
      } else {
        obj[portfolio[i].stock] += num
      }
    }
    let array = Object.entries(obj)
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < json.length; k++) {
        if (array[j][0] === json[k].quote.symbol) {
          // console.log('FFFFF', array[j][1])
          let num =
            array[j][1] *
            Number.parseFloat(json[k].quote.latestPrice).toFixed(2)
          let roundedNum = num.toFixed(2)
          console.log('DDDDDDDD', num.toFixed(2))
          string.push(`${array[j][0]} - ${array[j][1]} shares $${roundedNum} `)
        }
      }
    }
    console.log('RRRRRRR', string)
    return string
    // console.log('GFGHVGHV', json)
  }

  render() {
    const {email} = this.props
    const {budget} = this.props
    const {error, isLoaded, items} = this.state
    console.log('HELLLOOOO', this.state.stocks)

    if (this.state.stocks.length === 0) {
      return <h1>Loading!</h1>
    } else {
      let values = Object.values(items)
      let price = this.findItem()
      console.log(values)
      return (
        <div>
          <CardGroup>
            <Card>
              <Card.Body>
                <div>
                  <Card.Title>Transactions</Card.Title>
                  <Card.Subtitle>
                    Current Budget: ${Number.parseFloat(budget).toFixed(2)}
                  </Card.Subtitle>
                  {this.state.stocks.map(port => (
                    <Card.Text key={port.stock}>
                      Bought ({port.stock}) - {port.quantity} Shares @ $
                      {Number.parseFloat(port.price / port.quantity).toFixed(
                        2
                      )}{' '}
                      per share on {port.createdAt.slice(0, 10)}
                      <Card.Text>
                        Current Price ${this.findItem(port.stock, values)} per
                        share
                      </Card.Text>
                    </Card.Text>
                  ))}
                </div>
              </Card.Body>
            </Card>
            <div>
              <Card>
                <Card.Title>My Current Portfoliio</Card.Title>

                {this.listMyStocks(this.state.stocks, values).map(sentence => (
                  <Card.Text>{sentence}</Card.Text>
                ))}
              </Card>
            </div>
          </CardGroup>
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

export default connect(mapState, null)(UserHistory)

UserHistory.propTypes = {
  email: PropTypes.string,
  budget: PropTypes.number,
  id: PropTypes.number
  // stock: PropTypes.number
}
