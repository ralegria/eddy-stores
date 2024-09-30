import { Route, Routes } from "react-router-dom";

import Root from "../views/Home";

import mainRoutes from "./routes";
import Layout from "../layout";

const Router = () => {
  const { home: root } = mainRoutes;
  return (
    <Layout>
      <Routes>
        <Route path={root} element={<Root />} />
      </Routes>
    </Layout>
  );
};

export default Router;
