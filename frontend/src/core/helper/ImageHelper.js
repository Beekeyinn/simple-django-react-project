import React from "react";

function ImageHelper({ product }) {
  const imageUrl = product
    ? product.image
    : "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg";
  return (
    <div className="rounded border border-info p-2">
      <img
        src={imageUrl}
        alt={product.name}
        className="mb-3 rounded"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}

export default ImageHelper;
