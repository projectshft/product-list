import { useSelector } from "react-redux"

const Footer = () => {
  const pageQuery = useSelector(state => state.products.pageNum);
  const numOfDocs = useSelector(state => state.products.numOfDocs);
  const numOfPages = numOfDocs / 9 - (pageQuery - 1);

  const renderFooter = () => {
    let footer = [];
    for (let i = 1; i <= numOfPages; i++) {
      footer.push(

            <li key={i} className="page-item"><a className="page-link" href={"/products?page=" + i}>{i}</a></li>
  
      )
    };
    return footer;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{renderFooter()}</ul></nav>
  )
}

export default Footer