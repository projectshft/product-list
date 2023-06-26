//Returns Number button on NumberBar at the bottom of the browser
export default function NumberBarExcerpt ({number,setPageNumber}) {

  return (
    <button 
      type="button" 
      className="btn btn-primary"
      onClick={event => {setPageNumber(number);}}
    >
      {number}
    </button>
  )
}

