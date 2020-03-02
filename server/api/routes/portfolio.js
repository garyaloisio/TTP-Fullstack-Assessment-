const router = require('express').Router()
const {User, Portfolio} = require('../../db/models')
// const utils = require('./utils')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log('HELLOOOOOO')
  try {
    let newPortfolio = await Portfolio.create({
      stock: req.body.stock,
      quantity: req.body.quantity,
      price: req.body.price,
      userId: req.body.userId
    })
    console.log('hello')
    let account = await User.findByPk(req.body.userId)
    console.log(account)
    let currentBalance = account.budget
    await account.update({
      budget: Number(currentBalance) - Number(req.body.price)
    })
    res.send(newPortfolio)
  } catch (err) {
    next(err)
  }
})

// router.get('/active', async (req, res, next) => {
//   try {
//     if (!req.user) {
//       if (!req.session.cart) {
//         req.session.cart = []
//         res.json(req.session.cart)
//       } else {
//         res.json(req.session.cart)
//       }
//     } else {
//       const cart = await Cart.findOne({
//         // include: [{model: Product}],
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       res.json(cart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// // router.get('/past', utils.userGateway, async (req, res, next) => {
// //   try {
// //     const cart = await Cart.findAll({
// //       include: [{model: Product}],
// //       where: {
// //         userId: req.user.id,
// //         active: false
// //       }
// //     })
// //     res.json(cart)
// //   } catch (err) {
// //     next(err)
// //   }
// // })

// // router.get('/all', utils.adminGateway, async (req, res, next) => {
// //   try {
// //     const cart = await Cart.findAll({
// //       include: [{model: Product}]
// //     })
// //     res.json(cart)
// //   } catch (err) {
// //     next(err)
// //   }
// // })

// // router.get('/all/:id', utils.adminGateway, async (req, res, next) => {
// //   try {
// //     const cart = await Cart.findAll({
// //       include: [{model: Product}],
// //       where: {
// //         userId: req.params.id
// //       }
// //     })
// //     res.json(cart)
// //   } catch (err) {
// //     next(err)
// //   }
// // })

// //this route can add items to the active cart.
// router.post('/active', async (req, res, next) => {
//   try {
//     if (!req.user) {
//       let cart = req.session.cart
//       let existingItem = cart.find(item => item.id === req.body.productId)
//       if (!existingItem) {
//         let newItem = await Product.findByPk(req.body.productId)
//         let cartItem = {
//           imageUrl: newItem.imageUrl,
//           id: newItem.id,
//           title: newItem.title,
//           price: newItem.price,
//           quantity: req.body.quantity,
//           stock: newItem.stock
//         }
//         cart.push(cartItem)
//       } else {
//         existingItem.quantity += req.body.quantity
//       }
//       res.json(cart)
//     } else {
//       const cart = await Cart.findOne({
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       const existingItem = await CartItem.findOne({
//         where: {
//           cartId: cart.id,
//           productId: req.body.productId
//         }
//       })
//       if (!existingItem) {
//         const newItem = await CartItem.create({
//           cartId: cart.id,
//           productId: req.body.productId,
//           quantity: req.body.quantity
//         })
//       } else {
//         await existingItem.update({
//           quantity: existingItem.quantity + req.body.quantity
//         })
//       }
//       const updatedCart = await Cart.findOne({
//         include: [{model: Product}],
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       res.json(updatedCart)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// //this route will delete an item from a cart
// router.put('/active/delete', async (req, res, next) => {
//   try {
//     if (!req.user) {
//       let prodId = req.body.id
//       let cart = req.session.cart
//       let index = cart.findIndex(product => product.id === prodId)
//       cart.splice(index, 1)
//       res.json(cart)
//     } else {
//       const cart = await Cart.findOne({
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       const itemToDestroy = await CartItem.findOne({
//         where: {
//           cartId: cart.id,
//           productId: req.body.id
//         }
//       })
//       await itemToDestroy.destroy()
//       const updatedCart = await Cart.findOne({
//         include: [{model: Product}],
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       res.json(updatedCart)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// //this route will update an item that is already in the cart.  When a user selects a new quantity, this route will edit the quantity in the db, and resend a whole new cart to rerender the carts page
// router.put('/active', async (req, res, next) => {
//   try {
//     if (!req.user) {
//       let prodId = req.body.productId
//       let cart = req.session.cart
//       let index = cart.findIndex(product => product.id === prodId)
//       cart[index].quantity = req.body.quantity
//       res.json(cart)
//     } else {
//       const cart = await Cart.findOne({
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       const existingItem = await CartItem.findOne({
//         where: {
//           cartId: cart.id,
//           productId: req.body.productId
//         }
//       })
//       await existingItem.update({
//         quantity: req.body.quantity
//       })
//       const updatedCart = await Cart.findOne({
//         include: [{model: Product}],
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       res.json(updatedCart)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// /*
// The below route will checkout the cart by doing the following:
// 1.  finding the cart of the user on session
// 2.  mapping through the products in that cart and for each product:
//   1.  Getting the quantity of that CartItem
//   2.  Loading that CartItems's product and decreasing the inventory based on the CartItem quantity
//   3.  Set the price in CartItem to the products current price
// 3.  change the carts active status to false
// 4.  create a new cart
// 5.  set that carts userId to the user on session
// */

// router.put('/checkout', async (req, res, next) => {
//   try {
//     if (!req.user) {
//       let session = {...req.session}
//       let cart = session.cart
//       const newDbCart = await Cart.create() //this cart is where we store CartItems so that theres a history of the guest checkout
//       cart.forEach(async product => {
//         const quantityInCart = product.quantity
//         const inventoryProduct = await Product.findByPk(product.id)
//         await inventoryProduct.update({
//           stock: inventoryProduct.stock - quantityInCart
//         })
//         await CartItem.create({
//           price: inventoryProduct.price,
//           productId: product.id,
//           quantity: product.quantity,
//           cartId: newDbCart.id
//         })
//       })
//       await newDbCart.update({
//         active: false
//       })
//       req.session.cart = []
//       cart = req.session.cart
//       res.json(cart)
//     } else {
//       const cart = await Cart.findOne({
//         include: [{model: Product}],
//         where: {
//           userId: req.user.id,
//           active: true
//         }
//       })
//       const products = cart.products
//       products.forEach(async product => {
//         const quantityInCart = product.cartItem.quantity
//         const inventoryProduct = await Product.findByPk(product.id)
//         await inventoryProduct.update({
//           stock: inventoryProduct.stock - quantityInCart
//         })
//         await product.cartItem.update({
//           price: inventoryProduct.price
//         })
//       })
//       const total =
//         products.reduce((accumulator, product) => {
//           return accumulator + product.cartItem.quantity * product.price
//         }, 0) / 100
//       utils.emailConfirmation(req.user.email, cart.id, total, products) //This line sends the email confirmation
//       await cart.update({
//         active: false
//       })
//       const newCart = await Cart.create({
//         userId: req.user.id
//       })
//       res.json(newCart)
//     }
//   } catch (error) {
//     next(error)
//   }
// })
