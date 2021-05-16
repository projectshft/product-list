function Button({page, changePage}) {
  return (
      <>
        <li key= {page} className="page-item"><button className='btn btn-primary' onClick= {()=>{changePage(page)}}>{page}</button></li>
      </>
  );
}

export default Button;
