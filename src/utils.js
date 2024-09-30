export const currency = (amount) => {
  return new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateValue) => {
  // Convert to UTC timezone and format the string
  const formattedString = dateValue.format() + "Z";

  return formattedString;
};

export const imageURL = (url) => {
  return `${process.env.REACT_APP_STRAPI_URL}${url}`;
};
