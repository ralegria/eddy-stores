import { gql } from "@apollo/client";

export const GET_WEBSITE_STYLE = gql`
  query WebsiteStyle {
    websiteStyle {
      title
      logo {
        url
      }
    }
  }
`;

export const GET_HOME_PAGE = gql`
  query HomePage(
    $pricingFilters: ComponentFieldsPricingFiltersInput
    $discountsFilters: ComponentFieldsDiscountsFiltersInput
  ) {
    homePage {
      blocks {
        ... on ComponentComponentsBanner {
          __typename
          id
          isFullWidth
          autoplay
          height
          slides {
            id
            title
            subtitle
            description
            Alignment
            showSearchbar
            background {
              color_code
              media {
                url
              }
            }
            product_list {
              title
              subtitle
              type
              categories {
                documentId
                name
              }
              products {
                documentId
                title
                categories {
                  name
                }
                pricing(filters: $pricingFilters) {
                  amount
                }
                discounts(filters: $discountsFilters) {
                  amount
                  type
                  start_date
                  end_date
                }
                media {
                  url
                }
              }
            }
          }
        }
        ... on ComponentComponentsProductList {
          __typename
          id
          type
          title
          subtitle
          products {
            documentId
            title
            media {
              url
            }
            categories {
              name
            }
            pricing(filters: $pricingFilters) {
              amount
            }
            discounts(filters: $discountsFilters) {
              amount
              type
              start_date
              end_date
            }
          }
          categories {
            documentId
            name
          }
        }
      }
    }
  }
`;
