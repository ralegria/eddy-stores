import { Helmet as MainHelmet } from "react-helmet";
import useStyles from "../../hooks/useStyles";

const Helmet = () => {
  const { styles } = useStyles();
  return (
    <MainHelmet>
      <title>{styles.title}</title>
    </MainHelmet>
  );
};

export default Helmet;
