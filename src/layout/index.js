import { Layout as MainLayout } from "antd";

import Helmet from "./Helmet";
import Navbar from "./Navbar";

import "./Layout.scss";
import Cart from "./Cart";

const { Header, Footer, Content } = MainLayout;

const Layout = ({ children }) => {
  return (
    <>
      <Helmet />
      <MainLayout className="main-layout">
        <Header className="header">
          <Navbar />
        </Header>
        <Content className="content">
          {children}
          <Cart />
        </Content>
        <Footer className="footer">Footer</Footer>
      </MainLayout>
    </>
  );
};

export default Layout;
