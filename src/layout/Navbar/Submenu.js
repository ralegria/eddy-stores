import cn from "classnames";
import { isEmpty } from "lodash";

import "./Navbar.scss";

const Submenu = ({ content, onClose }) => {
  const { children } = content;
  const subMenuContentClassess = cn("content", {
    "more-columns": children.length > 4,
  });
  return (
    <>
      <div
        className={cn("submenu", {
          animate__fadeInDown: false,
        })}
      >
        <div className={subMenuContentClassess}>
          {children.map(({ key, label, children }) => {
            return (
              <div key={key} className="submenu_item">
                {label}
                {!isEmpty(children) && (
                  <div className="level2_submenu">
                    {children.map(({ key, label }) => {
                      return (
                        <div key={key} className="level2_item">
                          {label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="submenu-outer-area" onClick={() => onClose(content)} />
    </>
  );
};

export default Submenu;
