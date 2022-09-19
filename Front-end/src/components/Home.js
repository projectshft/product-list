import Display from "../containers/Display";
import PaginateRender from "../containers/paginateRender";

const Home = () => {
  return (
    <div>
      <div>
        <h1>Welcome to our Product Store!</h1>
      </div>
      <div className="container">
        <div className="container">
          <Display />
        </div>
      </div>
      <div className="container">
        <PaginateRender />
      </div>
    </div>
  );
};
export default Home;
