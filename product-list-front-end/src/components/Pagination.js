
const Pagination = () => {
  const previous = '<<previous'
  const next = 'next>>'

  return (
    <div className="right-align">
      <p>{previous}</p> <p>1</p> <p>2</p> <p>3</p> <p>4</p> <p>5</p> <p>6</p> <p>7</p> <p>8</p> <p>9</p> <p>10</p><p>11</p><p>{next}</p>
    </div>
  )
}

export default Pagination;