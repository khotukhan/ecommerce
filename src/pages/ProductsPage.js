import React from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero } from '../components'

const ProductsPage = () => {
  return (
    <main>
      <PageHero title="products" />

      <Wrapper>
        <div className="section-center products">
          <Filters className="filtersUi" />
          <div className="productUi">
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  .filterUi {
    grid-column: 1/3;
    grid-row: 1/2;
  }
  .productUi {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  @media (min-width: 300px) {
    .products {
      grid-template-columns: 114px 2fr;
    }
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
