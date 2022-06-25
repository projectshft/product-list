import './Product.css';

const Product = (props) => {
    return (
        <div className="ProductList card">
            <div className="card-body">
                <p className="card=text">Category:<strong>{props.category}</strong><strong>{props.price}</strong></p>
                <img src={props.image} alt={props.name}/>
                <h3 className="card-title">{props.name}</h3>
            </div>
        </div>
    )
};

export default Product;