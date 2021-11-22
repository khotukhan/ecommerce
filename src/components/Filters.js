import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')
  return (
    <Wrapper className="wrapper">
      <div className="content" style={{ width: '1rem' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <div className="x">
              <h3> category </h3>
              <div>
                {categories.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      type="button"
                      name="category"
                      style={{ fontSize: '1rem' }}
                      className={`${
                        category === c.toLowerCase() ? 'active' : null
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          {/* end of categories */}
          {/* companies */}
          <div className="form-control">
            <h3> company</h3>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
              style={{ width: '5rem' }}
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}

          <div className="form-control">
            <div className="form-colors">
              <h3> colors </h3>
              <div className="colors">
                {colors.map((c, index) => {
                  if (c === 'all') {
                    return (
                      <button
                        key={index}
                        name="color"
                        onClick={updateFilters}
                        data-color="all"
                        className={`${
                          color === 'all' ? 'all-btn active' : 'all-btn'
                        }`}
                      >
                        all
                      </button>
                    )
                  }
                  return (
                    <button
                      key={index}
                      name="color"
                      style={{ background: c }}
                      className={`${
                        color === c ? 'color-btn active' : 'color-btn'
                      }`}
                      data-color={c}
                      onClick={updateFilters}
                    >
                      {color === c ? <FaCheck /> : null}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          {/* end of colors */}

          {/* price */}
          <div className="form-control ">
            <h5> price</h5>
            <p className="price"> {formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}

          {/* shipping */}
          <div className="form-control shipping ">
            <label
              htmlFor="shipping"
              onChange={updateFilters}
              checked={shipping}
            >
              {' '}
              free shipping{' '}
            </label>
            <input type="checkbox" name="shipping" id="shipping" />
          </div>

          {/* end of shipping */}
        </form>
        <span>
          {' '}
          <button type="button" className="clear-btn " onClick={clearFilters}>
            clear filters
          </button>
        </span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 7rem;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: grid;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 300px) {
    h3 {
      font-size: 1rem;
    }
    .search-input {
      width: 5rem;
    }
  }
  @media (min-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    .search-input {
      width: 10rem;
    }
  }
  ${
    '' /* @media (min-width: 300px) {
    .content {
      display: grid;
    }
    .form-control {
      display: grid;

      .search-input {
        grid-column: 3/4;
        grid-row: 1/2;
      }
      .x {
        grid-column: 1/2;
        grid-row: 1/2;
      }
      .company {
        grid-column: 1/2;
        grid-row: 2/3;
      }
      .form-colors {
        grid-column: 1/2;
        grid-row: 2/3;
      }
    }
  } */
  }
`

export default Filters
