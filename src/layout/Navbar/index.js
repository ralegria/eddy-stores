import { Button } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

import useStyles from "../../hooks/useStyles";
import useLayout from "../../hooks/useLayout";
import useCart from "../../hooks/useCart";

import Images from "../../components/Images";

import "./Navbar.scss";

const Navbar = () => {
  const { styles, loading } = useStyles();
  const { switchCart } = useLayout();
  const { formatSubtotal } = useCart();

  return (
    <navbar className="main-navbar">
      <div className="logo-container">
        {!loading && (
          <Images
            alt="Logo"
            src={styles?.logo?.url}
            className="main-logo"
            preview={false}
          />
        )}
      </div>
      <div className="menu">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Services</Link>
        <Link>Contact</Link>
      </div>
      <div className="actions">
        <Button onClick={() => switchCart()}>
          {formatSubtotal}
          <ShoppingCartOutlined />
        </Button>
      </div>
    </navbar>
  );
};

export default Navbar;
