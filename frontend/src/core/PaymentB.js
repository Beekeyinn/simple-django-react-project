import React, { useEffect, useState } from "react";
import { isAuthenticated, logOut } from "../auth/helper";
import { emptyCart } from "./helper/CartHelper";
import { createOrdered } from "./helper/OrderHelper";
import { getMeToken, processPayment } from "./helper/PaymentHelper";

import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (fun) => fun,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: false,
    instance: {},
  });

  const navigate = useNavigate();
  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log(info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
        logOut(() => {
          return navigate("login");
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ ...info, clientToken: clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    console.log(info.instance);
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((response) => {
        console.log(response);
        nonce = response.nonce;
        const paymentData = {
          paymentMethodNounce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
              if (response.code === "1") {
                console.log("Payment Failed");
                logOut(() => {
                  navigate("/");
                });
              }
            } else {
              setInfo({
                ...info,
                success: response.success,
                loading: false,
              });
              console.log("Payment Success");
              let product_names = "";
              products.forEach((product) => {
                product_names += product.name + ", ";
              });
              const orderData = {
                products: product_names,
                transaction_id: response.transactions_id,
                amount: response.transaction.amount,
              };
              createOrdered(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code === "1") {
                      console.log("Order Failed");
                    }
                    logOut(() => {
                      navigate("/login");
                    });
                  } else {
                    if (response.success === true) {
                      console.log("Order Success");
                    }
                  }
                })
                .catch((err) => {
                  setInfo({ ...info, loading: false, success: false });
                  console.log("Order Failed");
                });
              emptyCart(() => {
                console.log("Cart is emptied");
              });
              setReload(!reload);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error("Nonce", error);
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + parseInt(product.price);
    });
    return amount;
  };

  const btnDropDown = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) =>
                setInfo({ ...info, instance: instance })
              }
            />
            <button
              className="btn btn-block btn-success"
              disabled={info.loading}
              onClick={onPurchase}
            >
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Your cart is empty.</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      {getAmount() > 0 ? <h3>Your total amount is: ${getAmount()}</h3> : <></>}
      {btnDropDown()}
    </div>
  );
};

export default PaymentB;
