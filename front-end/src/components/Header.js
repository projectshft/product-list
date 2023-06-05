
function Header () {

  // const handleDropdownClick = () => {
  //   return false;
  // }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div className="container-align">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Tools</a></li>
                <li><a class="dropdown-item" href="#">Children</a></li>
                <li><a class="dropdown-item" href="#">55 Burgers</a></li>
                <li><a class="dropdown-item" href="#">55 Fries</a></li>
                <li><a class="dropdown-item" href="#">55 Cokes</a></li>
                <li><a class="dropdown-item" href="#">55 Hot dogs</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Price
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Highest to lowest</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Lowest to highest</a></li>
              </ul>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;