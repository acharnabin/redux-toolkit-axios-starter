import { Link, useParams } from "react-router";
import "../App.css";
import { useSelector } from "react-redux";

function About() {

  const params=useParams()
  const { productData } = useSelector(
    (s) => s.product
  );
  console.log(params)
  return (
    <>
      <h1>About</h1>
      <div className="card">
        {productData?.length}
      </div>
      <Link to="/">Home</Link>
     
    </>
  );
}

export default About;
