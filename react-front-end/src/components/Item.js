function Item({product}) {
  return (
    <>
        <div className='col-sm-2 item' style={{display: 'inline-block'}}>
          <div>
            <p>{product.category}</p>
            <p className='text-right'>{product.price}</p>
            <img src={product.image} alt='' width={200}/>
            <h1>{product.name}</h1>
          </div>
        </div>
    </>
  );
}

export default Item;
