import { Helmet as MainHelmet } from "react-helmet";
import useSettings from "../../hooks/useSettings";
import { imageURL } from "../../utils";

const Helmet = () => {
  const { general_setting } = useSettings();
  return (
    <MainHelmet>
      <title>{general_setting.title}</title>
      <meta name="description" content={general_setting.description} />
      <link rel="icon" href={imageURL(general_setting.favicon?.url)} />
    </MainHelmet>
  );
};

export default Helmet;
