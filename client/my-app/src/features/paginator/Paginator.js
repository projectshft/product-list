import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export const Paginator = () => {
  let active;
  let items = [];
  const dispatch = useDispatch();
  const products = useSelector(state => state.inventory.products);
  const clickHandler = () => { 
    const paginationUL = document.getElementById("pages");
    const lis = paginationUL.getElementsByTagName("li");

    for (let i = 0; i < lis.length; i ++) {
      if (lis[i].childNodes[0].classList.contains("active")) {
        lis[i].childNodes[0].classList.remove("active")
        };
    }
  }

  for (let number = 1; number <= Math.ceil(products.length / 9); number++) {
    items.push(
      <Pagination.Item 
          key={number}
          active={number === active}
          onClick={(e) => { 
            dispatch({type: 'inventory/goToPage', payload: number});
            clickHandler();
            e.target.classList.contains("active")? e.target.classList.remove("active")  : e.target.classList.add("active");
            }
          }>
        {number}
      </Pagination.Item>,
    );
  }
return (
  <div>
    <Pagination id="pages">
      {items}
    </Pagination>
  </div>
)
}
