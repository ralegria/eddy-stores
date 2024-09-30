import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetProducts(
    $pricingFilters: ComponentFieldsPricingFiltersInput
    $stockFilters: ComponentFieldsStockFiltersInput
    $discountsFilters: ComponentFieldsDiscountsFiltersInput
    $categoryFilters: ProductFiltersInput
  ) {
    products(filters: $categoryFilters) {
      documentId
      title
      short_description
      long_description
      media {
        url
      }
      pricing(filters: $pricingFilters) {
        amount
        region {
          country_code
          currency_code
        }
      }
      discounts(filters: $discountsFilters) {
        amount
        start_date
        end_date
        type
      }
      categories {
        documentId
        name
        cover_image {
          url
        }
      }
      stock(filters: $stockFilters) {
        amount
        warehouse {
          name
          documentId
        }
      }
    }
  }
`;
