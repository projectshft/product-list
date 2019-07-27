## Product List

This project has been created by a student at Project Shift, a software engineering fellowship located in Downtown Durham.  The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit projectshift.io or email hello@projectshift.io.

####TODO

restart/sleep checklist
- [X] start mongod in cmd
- [X] start mongo in cmd
- [X] start backend server nodemon
- [X] start react app
- [X] if time check installing mongo in wsl

BACKEND IMPROVEMENTS
- [ ] faker randomize images
- [ ] make sure all gets check enabled
- [X] add pre save for date created and date updated
- [X] product is null if not found
- [X] delete also deletes reviews
- [ ] add pre for findbyidandupdate to change updated_at
      doesnt work, updated in find manually
- [ ] currently remove review does not delete it from reviews [] in product
- [ ] add mongo indexes - by category, search terms?
- [ ] add middleware to only find documents with { enable: true }

FRONTEND PLAN
- [ ] initial action and reducer to call api
  - [ ] redux promise middleware

- [ ] ProductsList - container?
  - [ ] mapStateToProps
    - [ ] products array
    - [ ] number of items per page? or calculated?
    - [ ] number of pages
    - [ ] current page
  - [ ] mapDispatchToProps - WOULD IT GO HERE OR IN PRODUCT COMPONENT?
  - [ ] map products array from store to Product components
  - [ ] send product to Product component as prop

- [ ] Product (component inside ProductsList)
  - [ ] product passed in through props (do not pass all products down!)

- [ ] Pagination (component inside ProductsList)
  - [ ] props passed down from ProductsList  
  - [ ] mapDispatchToProps
    - [ ] clicking on page has an action - changes page query option and sends get request
  - [ ] pagination redux
    - [ ] action - changes page query to page clicked on i.e. 'page=5' in get request
    - [ ] reducer - same as regular get reducer?

- [ ] SearchOptions - mapStateToProps here or in individual components? same with dispatch

- [ ] CategoryFilter - check if redux form does drop down (component inside SearchOptions)
  - [ ] mapStateToProps
    - [ ] current category, starts at all
  - [ ] mapDispatchToProps
    - [ ] on change action - add/change category filter i.e. 'category=computers' in get request

- [ ] SortPrice - same as above (component inside SearchOptions)
  - [ ] mapStateToProps
    - [ ] current sort, starts at null
  - [ ] mapDispatchToProps
    - [ ] on change action - add/change sort i.e. 'price=highest' in get request

EXTENSION - DO REST FIRST
- [ ] SearchBar - redux form (component inside SearchOptions)
  - [ ] mapStateToProps
    - [ ] last search term
  - [ ] mapDispatchToProps
    - [ ] on submit action - add/change search query i.e. 'search=laptop' in get request