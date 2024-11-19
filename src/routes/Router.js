import { Route, Routes } from "react-router-dom";

import Root from "../views/Home";
import Product from "../views/Product";

import mainRoutes from "./routes";
import Layout from "../layout";

const Router = () => {
  const { home: root, productDetails } = mainRoutes;
  return (
    <Layout>
      <Routes>
        <Route path={root} element={<Root />} />
        <Route path={productDetails} element={<Product />} />
      </Routes>
    </Layout>
  );
};

export default Router;
