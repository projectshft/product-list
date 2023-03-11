// import { fetchCount } from "../store/thunks/fetchCount";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// const Paginate = () => {
//   const dispatch = useDispatch();
//   const { countArray } = useSelector((state) => {
//     return state.count;
//   })

//   useEffect(() => {
//     dispatch(fetchCount());
//   }, [dispatch]);

//   const handleNewPage = () => {
//     dispatch(fetchCount())
//   }

//   return (
//   <div className='paginate-container'>
//     <div className='count'>
//       {countArray} 
//     </div>
//     Paginate 1-9 buttons option for 10?
//     <button onClick={handleNewPage}>1</button>
//   </div>
//   )
// };

// export default Paginate;