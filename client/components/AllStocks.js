import React from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import {CardDeck} from 'react-bootstrap'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  render() {
    const {products} = this.props
    if (!products) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div>
          <h4 className="page-head">ALL-PRODUCTS</h4>
          <CardDeck className="allProducts">
            {products.map(currentProduct => {
              return <Product key={currentProduct.id} {...currentProduct} />
            })}
          </CardDeck>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts
})

const Products = connect(mapStateToProps, null)(AllProducts)

export default Products
