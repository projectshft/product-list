const Pagination = () => {
  const previous = '<<previous'
  const next = 'next>>'
  
  const test = () => {
    console.log('test previous')
  }

  return (
    <div className="right-align">
      <p onClick={test}>{previous}</p> <p>{next}</p>
    </div>
  )
}

export default Pagination;