import { Image } from "antd";
import { imageURL } from "../../utils";

const Images = (props) => {
  const { src } = props;
  return <Image {...props} src={imageURL(src)} />;
};

export default Images;
