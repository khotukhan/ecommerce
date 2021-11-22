import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  /*-----------------------------------------*/
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    }
  }
  /*-----------------------------------------*/

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  /*-----------------------------------------*/

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  /*-----------------------------------------*/

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  /*-----------------------------------------*/

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1
        }
        if (a.price > b.price) {
          return 1
        }
        return 0
      })
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts, sort: action.payload }
  }
  /*-----------------------------------------*/

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    // dynamic values
    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  /*-----------------------------------------*/
  if (action.type === FILTER_PRODUCTS) {
    // start with fresh set of data - e.g. empty array
    // filtering requires default data or wont work
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters

    // set temp products = to all the equals
    let tempProducts = [...all_products]

    // clear filters
    // if we filtered based on text add to the new array
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }

    // colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    // price

    tempProducts = tempProducts.filter((product) => product.price <= price)

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }
    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer