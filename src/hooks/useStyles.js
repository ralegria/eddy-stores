import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_WEBSITE_STYLE } from "../graphql/SiteQueries";

const useStyles = () => {
  const [styles, setStyles] = useState({});
  const styleData = useQuery(GET_WEBSITE_STYLE, {
    onCompleted: (data) => {
      setStyles(data.websiteStyle);
    },
  });

  return {
    styles,
    ...styleData,
  };
};

export default useStyles;
