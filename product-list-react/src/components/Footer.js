import { useSelector } from "react-redux"

const Footer = () => {
  const pageNum = useSelector(state => state.products.pageNum);
  const documentCount = 90;

  const renderFooter = () => {
    console.log(pageNum)
  }

  return (
    <div>{renderFooter()}</div>
  )
}

export default Footer