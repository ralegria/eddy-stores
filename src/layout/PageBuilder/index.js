import { COMPONENTS } from "../../consts";

import Banner from "../../components/Banner";
import ProductList from "../../components/ProductList";

import "./PageBuilder.scss";

const PageBuilder = ({ blocks }) => {
  const AllElements = () =>
    blocks.reduce((elements, currentBlock) => {
      const blockType = currentBlock.__typename;
      const isBlockFullWidth = currentBlock.isFullWidth;

      const NewElement = ({ type }) => {
        switch (type) {
          case COMPONENTS.BANNER:
            return <Banner data={currentBlock} />;
          case COMPONENTS.PRODUCT_LIST:
            return <ProductList data={currentBlock} />;
          default:
            return <></>;
        }
      };
      //debugger;
      return (
        <>
          {elements}
          {!isBlockFullWidth && (
            <div className="padding-block">
              <NewElement type={blockType} />
            </div>
          )}
          {isBlockFullWidth && <NewElement type={blockType} />}
        </>
      );
    }, <></>);

  return <AllElements />;
};

export default PageBuilder;
