const Page = ({ value }) => {
  return <a href="/" className="mx-1">{value}</a>
}

const Pagination = ({ pageCount }) => {
  const pageNumbers = new Array(pageCount).fill(0).map((page, i) => {
    return <Page key={i} value={page + i + 1} />
  });

  return (
    <div className="row row-cols-auto d-flex justify-content-center">
      <p>Page {pageNumbers}</p>
    </div>
  )
};

export default Pagination;