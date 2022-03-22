import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/CoreApiCalls";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        console.log(data);
        if (data.error) {
          setErrors(data.error);
          console.log(errors);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   Runs only when loading the component i.e. once in beginning
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="HomePage" description="Welcome to e-Commerce">
      <h1>Home Component</h1>

      <div className="row">
        {products.map((product, index) => {
          return (
            // <div key={index}>
            //   <h1>{product.name}</h1>
            // </div>
            <div
              key={index}
              className="col-sm-12 col-12 col-lg-4 col-md-6 px-1 my-2"
            >
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
