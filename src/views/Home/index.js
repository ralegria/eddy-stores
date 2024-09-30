import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOME_PAGE } from "../../graphql/SiteQueries";
import { QUERY_FILTERS } from "../../consts";

import PageBuilder from "../../layout/PageBuilder";

import "./Home.scss";

const Home = () => {
  const [homePageBlocks, setHomePageBlocks] = useState([]);

  const { loading } = useQuery(GET_HOME_PAGE, {
    variables: {
      ...QUERY_FILTERS.pricingFilters,
      ...QUERY_FILTERS.discountsFilters,
    },
    onCompleted: (DATA) => {
      setHomePageBlocks(DATA?.homePage?.blocks);
    },
  });

  return (
    <div className="home-page">
      {!loading && <PageBuilder blocks={homePageBlocks} />}
    </div>
  );
};

export default Home;
