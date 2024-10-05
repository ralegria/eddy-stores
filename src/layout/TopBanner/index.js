import { Button } from "antd";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import useSettings from "../../hooks/useSettings";
import { closeTopBanner } from "../../redux/layoutSlice";

import { imageURL } from "../../utils";

import "./TopBanner.scss";

const TopBanner = () => {
  const dispatch = useDispatch();
  const { topBanners } = useSettings();

  if (!isEmpty(topBanners)) {
    return (
      <div className="top-banners-container">
        {topBanners.map((banner) => {
          const isClosable = banner.isClosable;
          const closeBannerHandler = () => {
            dispatch(closeTopBanner(banner.id));
          };
          const BG = !isEmpty(banner?.background?.media)
            ? {
                backgroundImage: `url(${imageURL(
                  banner?.background?.media.url
                )})`,
              }
            : {
                backgroundColor: banner?.background?.color_code,
                color: banner?.background?.text_color_code,
              };
          return (
            <>
              {!banner.closed && (
                <div
                  key={`${banner.title}-${banner.id}`}
                  className="top-banner"
                  style={BG}
                >
                  <div className="content">
                    {banner.link && (
                      <Link to={banner.link}>{banner.title}</Link>
                    )}
                    {!banner.link && banner.title}
                  </div>
                  {isClosable && (
                    <Button
                      type="circle"
                      className="close-btn"
                      icon={<CloseOutlined />}
                      onClick={() => closeBannerHandler()}
                    />
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  }

  return <></>;
};

export default TopBanner;
