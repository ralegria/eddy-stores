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
        type
        title
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

export const GET_PRODUCT = gql`
  query GetProduct(
    $documentId: ID!
    $pricingFilters: ComponentFieldsPricingFiltersInput
    $discountsFilters: ComponentFieldsDiscountsFiltersInput
    $stockFilters: ComponentFieldsStockFiltersInput
  ) {
    product(documentId: $documentId) {
      documentId
      title
      short_description
      long_description
      categories {
        documentId
        type
        title
      }
      media {
        url
      }
      pricing(filters: $pricingFilters) {
        amount
      }
      discounts(filters: $discountsFilters) {
        type
        amount
        start_date
        end_date
      }
      stock(filters: $stockFilters) {
        id
        amount
        warehouse {
          documentId
          name
          address
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      title
      documentId
      subcategories {
        title
      }
    }
  }
`;
