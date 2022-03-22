import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart,
  removeFromCart,
  reload = undefined,
  setReload = (fun) => fun,
}) => {
  const [redirect, setRedirect] = useState(false);

  const title = product ? product.title : "This is the title of the product";
  const description = product
    ? product.description
    : "This is the description of the product";
  const price = product ? product.price : "This is the price of the product";

  // navigation
  let navigate = useNavigate();

  const addToCartFunc = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
    } else {
      navigate("login");
    }
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return navigate("/cart");
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <div className="col-12">
          <button
            onClick={addToCartFunc}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add To Cart
          </button>
        </div>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              setReload(!reload);
              removeItemFromCart(product.id);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove From Cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{title}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <div className="mt-2">
          <span className="d-block text-left text-info font-weight-bolder py-1">
            Description:
          </span>
          <p className="lead font-weight-normal text-warp text-left text-monospace">
            {description}
          </p>
          <div>
            <span className="font-weight-bolder text-left text-info">Price:</span>
            <span className="mx-auto rounded text-monospace"> ${price}</span>
          </div>
          <div className="row">
            {showAddToCart(addtoCart)}
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  addtoCart: true,
  removeFromCart: false,
};

export default Card;
