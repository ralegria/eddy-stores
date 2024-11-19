import "./LongDescription.scss";

const LongDescription = ({ product }) => {
  const Element = ({ data }) => {
    const type = data.type;
    switch (type) {
      case "heading":
        switch (data.level) {
          case 1:
            return <h1>{data.children[0].text}</h1>;
          case 2:
            return <h2>{data.children[0].text}</h2>;
          case 3:
            return <h3>{data.children[0].text}</h3>;
          case 4:
            return <h4>{data.children[0].text}</h4>;
          case 5:
            return <h5>{data.children[0].text}</h5>;
          case 6:
            return <h6>{data.children[0].text}</h6>;
          default:
            return <></>;
        }
      case "paragraph":
        return <p>{data.children[0].text}</p>;
      case "list":
        const listItems = data.children ?? [];
        return (
          <ul>
            {listItems.map((item) => (
              <li>{item.children[0].text}</li>
            ))}
          </ul>
        );
      case "image":
        return (
          <img
            src={data.image.url}
            alt={data.alt}
            style={{ width: "100%", objectFit: "cover" }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="description-wrapper">
      {product.long_description?.reduce((content, element) => {
        return (
          <>
            {content}
            <Element data={element} />
          </>
        );
      }, <></>)}
    </div>
  );
};

export default LongDescription;
