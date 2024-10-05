import { Badge, Button, Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import useSettings from "../../hooks/useSettings";
import useLayout from "../../hooks/useLayout";
import useCart from "../../hooks/useCart";

import Images from "../../components/Images";

import "./Navbar.scss";

const Navbar = () => {
  const { switchCart } = useLayout();
  const {
    general_setting,
    navSettings,
    isSettingsLoading,
    menuItems,
    isNavLoading,
  } = useSettings();
  const { formatSubtotal, counter } = useCart();
  const layoutDesktop = navSettings?.layout_desktop?.split("\n");
  const navLayoutStyle = layoutDesktop?.reduce((layout, line, index) => {
    if (index === 0) {
      return `'${line}'`;
    }
    return `${layout} '${line}'`;
  }, ``);

  const loading = isNavLoading || isSettingsLoading;

  console.log(layoutDesktop, navLayoutStyle);

  return (
    <navbar
      className="main-navbar"
      style={{ display: "grid", gridTemplateAreas: navLayoutStyle }}
    >
      <div className="logo-container">
        {!loading && (
          <Images
            alt="Logo"
            preview={false}
            className="main-logo"
            src={general_setting?.logo?.url}
          />
        )}
      </div>
      <Menu className="menu" mode="horizontal" items={menuItems} />
      <div className="actions">
        <Badge count={counter}>
          <Button onClick={() => switchCart()}>
            {formatSubtotal}
            <ShoppingCartOutlined />
          </Button>
        </Badge>
      </div>
    </navbar>
  );
};

export default Navbar;
