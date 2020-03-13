// import axios from 'axios'
// import history from '../history'

// const GET_PORTFOLIO = 'GET_PORTFOLIO'

// const defaultPortfolio = {}

// const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

// export const port = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
// export default function(state = defaultPortfolio, action) {
//   switch (action.type) {
//     case GET_PORTFOLIO:
//       return action.user
//     default:
//       return state
//   }
// }
