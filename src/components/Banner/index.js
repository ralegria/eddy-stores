import cn from "classnames";
import { COMPONENTS } from "../../consts";
import { imageURL } from "../../utils";

import "./Banner.scss";

const Banner = ({ data }) => {
  const bannerHeight = data.height ?? 450;
  const bannerSlides = data.slides;
  const isCarousel = bannerSlides.length > 1;
  const bannerBGStyles = !isCarousel
    ? {
        ...(bannerSlides[0].background?.color_code && {
          backgroundColor: bannerSlides[0].background?.color_code,
        }),
        ...(bannerSlides[0].background?.media?.url && {
          backgroundImage: `url(${imageURL(
            bannerSlides[0].background?.media?.url
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }
    : {};
  const bannerClasses = cn("banner", {
    carousel: isCarousel,
  });
  return (
    <div
      key={`${COMPONENTS.BANNER}-${data.id}`}
      className={bannerClasses}
      style={{
        height: bannerHeight,
        ...bannerBGStyles,
      }}
    >
      {!isCarousel && (
        <div
          className={cn("banner-content", [
            bannerSlides[0].Alignment.toLowerCase(),
          ])}
        >
          <h1>{bannerSlides[0].title}</h1>
          <p>{bannerSlides[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Banner;
