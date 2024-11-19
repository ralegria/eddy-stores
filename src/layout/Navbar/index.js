import cn from "classnames";
import { useState } from "react";
import { isEmpty } from "lodash";
import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import routes from "../../routes/routes";

import useSettings from "../../hooks/useSettings";
import useLayout from "../../hooks/useLayout";
import useCart from "../../hooks/useCart";

import Images from "../../components/Images";
import Submenu from "./Submenu";

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

  const [subMenuItems, setSubMenuItems] = useState({});

  const { formatSubtotal, counter } = useCart();
  const layoutDesktop = navSettings?.layout?.split("\n");
  const navLayoutStyle = layoutDesktop?.reduce((layout, line, index) => {
    if (index === 0) {
      return `'${line}'`;
    }
    return `${layout} '${line}'`;
  }, ``);

  const subMenuHandler = (menuItem) => {
    const hasChildren = !isEmpty(menuItem.children);

    if (hasChildren && subMenuItems.key !== menuItem.key) {
      setSubMenuItems(menuItem);
    } else {
      setSubMenuItems({});
    }
  };

  const loading = isNavLoading || isSettingsLoading;

  return (
    <>
      <navbar
        className="main-navbar"
        style={{ display: "grid", gridTemplateAreas: navLayoutStyle }}
      >
        <div className="logo-container">
          {!loading && (
            <Link to={routes.home}>
              <Images
                alt="Logo"
                preview={false}
                className="main-logo"
                src={general_setting?.logo?.url}
              />
            </Link>
          )}
        </div>
        <ul className="menu">
          {menuItems?.map((item) => {
            const { key, label } = item;
            return (
              <li
                key={key}
                className={cn("menu_item", {
                  active: subMenuItems ? subMenuItems.key === item.key : false,
                })}
                onClick={() => subMenuHandler(item)}
              >
                {label}
              </li>
            );
          })}
        </ul>
        <div className="actions">
          <Badge count={counter}>
            <Button onClick={() => switchCart()}>
              {formatSubtotal}
              <ShoppingCartOutlined />
            </Button>
          </Badge>
        </div>
      </navbar>
      {!isEmpty(subMenuItems) && (
        <Submenu content={subMenuItems} onClose={subMenuHandler} />
      )}
    </>
  );
};

export default Navbar;
