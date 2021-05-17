const header = (props) => {
  return (
    <div>
      <div className="text-center">
        <div className="container">
          <h3 className="heading display-4"><span className="iconify" data-inline="false" data-width="75" data-height="75"></span>Product Store<span className="iconify" data-inline="false" data-width="75" data-height="75"></span></h3>

        </div>
      </div>
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default header;