import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";

export const ProductsCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default behaviour, empty form submission
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        quantity,
      }),
    });
    await navigate(-1); // redirect to the previous page
  };

  return (
    <Wrapper>
      <form className="mt-3" onSubmit={submit}>
        <div className="form-floating pb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating pb-3">
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <label htmlFor="price">Price</label>
        </div>
        <div className="form-floating pb-3">
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};
