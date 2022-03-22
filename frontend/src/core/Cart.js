import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getCart } from "./helper/CartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setCartProducts(getCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return products.length !== 0 ? (
      <div>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              reload={reload}
              setReload={setReload}
            ></Card>
          );
        })}
      </div>
    ) : (
      <h1>No Products</h1>
    );
  };

  return (
    <Base title="Cart" description="Your Products in your cart">
      <div className="row text-center">
        <div className="col-lg-6 col-md-6 col-sm-12">{loadAllProducts(cartProducts)}</div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          {cartProducts.length <= 0 ? (
            <h3>Please add Something in Cart</h3>
          ) : (
            <PaymentB products={cartProducts} setReload={setReload} />
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
