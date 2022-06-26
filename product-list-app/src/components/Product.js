import './Product.css';

const Product = (props) => {
    return (
        <div className="Product card">
            <div className="card-body">
            <div className="header">
                <span className="card-text">Category: <strong>{props.category}</strong></span>
                <span className="card-text"><strong>{props.price}</strong></span>
            </div>
            <img src={props.image} alt={props.name}/>
            <h2 className="card-title">{props.name}</h2>
            </div>
        </div>
    )
};

export default Product;