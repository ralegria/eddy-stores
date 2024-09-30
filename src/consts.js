export const DISCOUNT_TYPES = {
  PERCENTAGE: "Porcentaje_de_descuento",
  FIXED: "Nuevo_precio_en_descuento",
};

export const PRODUCT_CARD_STYLES = {
  DEFAULT: "default-card",
  HORIZONTAL: "horizontal-card",
  CART: "cart-card",
};

export const COMPONENTS = {
  BANNER: "ComponentComponentsBanner",
  PRODUCT_LIST: "ComponentComponentsProductList",
};

export const QUERY_FILTERS = {
  pricingFilters: {
    region: {
      country_code: {
        eq: "sv",
      },
    },
  },
  discountsFilters: {
    region: {
      country_code: {
        eq: "sv",
      },
    },
  },
  stockFilters: {
    warehouse: {
      region: {
        country_code: {
          eq: "sv",
        },
      },
    },
  },
};
