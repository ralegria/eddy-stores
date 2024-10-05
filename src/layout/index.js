import { Layout as MainLayout } from "antd";

import TopBanner from "./TopBanner";
import Helmet from "./Helmet";
import Navbar from "./Navbar";
import Cart from "./Cart";

import "./Layout.scss";

const { Header, Footer, Content } = MainLayout;

const Layout = ({ children }) => {
  return (
    <>
      <Helmet />
      <MainLayout className="main-layout">
        <TopBanner />
        <div className="body">
          <Header className="header">
            <Navbar />
          </Header>
          <Content className="content">
            {children}
            <Cart />
          </Content>
          <Footer className="footer">Footer</Footer>
        </div>
      </MainLayout>
    </>
  );
};

export default Layout;
