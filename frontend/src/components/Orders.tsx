import { useState } from "react";

export const Orders = () => {
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("Buy your favorite product");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        quantity,
      }),
    });

    setMessage("Your order has been placed");
  };

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
          <p className="lead">{message}</p>
        </div>
        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Product</label>
              <input
                className="form-control"
                type="text"
                placeholder="Product"
                aria-label="Product"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                aria-label="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <hr className="my-4" />
          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Buy
          </button>
        </form>
      </main>
    </div>
  );
};
