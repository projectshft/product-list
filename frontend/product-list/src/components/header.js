const Header = (props) => {
  return (
    <div>
      <div className='bg-light p-5 rounded-lg text-center'>
        <div className='container'>
          <h1 className='display-6'>Great Hall of Mystery (and Assorted Appliances)</h1>
        </div>
      </div>
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
};

export default Header;