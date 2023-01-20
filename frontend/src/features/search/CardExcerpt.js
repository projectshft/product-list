//Returns a card for each product
export default function CardExcerpt ({element}) {
  let {category, image, name, price,} = element;
  return (
    <div className="col ">
      <div className="card" style={{width: 288}}>
        <img src={image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Category: {category}</li>
          <li className="list-group-item">${price}</li>
        </ul>
      </div>
    </div>
  )
}
