import { gql } from "@apollo/client";

export const GENERAL_SETTINGS = gql`
  query GeneralSetting {
    generalSetting {
      title
      logo {
        url
      }
      description
      favicon {
        url
      }
      metatags {
        name
        content
      }
    }
  }
`;

export const NAVIGATION_SETTINGS = gql`
  query GetNavSetting {
    navSetting {
      layout
      showHomeInMenu
      isTopBannerClosable
      menu {
        id
        name
        label
        url
        is_external
        badge
        submenu_items {
          id
          name
          label
          description
          badge
          url
          is_external
          icon {
            url
            name
          }
          banner {
            url
            name
          }
          cta {
            id
            name
            label
            url
            bg_color
            text_color
          }
          submenu_items {
            id
            name
            label
            badge
            url
            is_external
          }
        }
      }
      top_banners {
        id
        title
        description
        link
        start_date
        end_date
        background {
          color_code
          text_color_code
          media {
            url
            name
          }
        }
      }
      menu_categories_relation {
        name
        category {
          documentId
          title
        }
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
              text_color_code
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
                title
              }
              products {
                documentId
                title
                categories {
                  title
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
              title
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
            title
          }
        }
      }
    }
  }
`;
