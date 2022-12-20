import 'bootstrap/dist/css/bootstrap.css';

const ProductListItem = ({item}) => {

    return (
        <div className="flex-item">
            <p>Category: <span><strong>{item.category}</strong></span><span className="item-price">${item.price}</span></p>
            <img src={item.image}></img>
            
            <h4>{item.name}</h4>
        </div>
    )

}

export default ProductListItem