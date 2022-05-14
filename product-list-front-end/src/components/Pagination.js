const Pagination = () => {
  const previous = '<<previous'
  const next = 'next>>'
  
  return (
    <div className="right-align">
      <p>{previous} {next}</p>
    </div>
  )
}

export default Pagination;