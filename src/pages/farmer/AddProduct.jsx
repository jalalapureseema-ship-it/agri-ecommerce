
import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "Kg",
    quantity: "",
    image: "",
    location: "",
  });

  const [message, setMessage] = useState("");

  // Update form values
  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }

  // Read selected image
  function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProduct({
          ...product,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  // Save product
  function handleSubmit(e) {
    e.preventDefault();

    const oldProducts =
      JSON.parse(localStorage.getItem("farmerProducts")) || [];

    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    oldProducts.push(newProduct);

    localStorage.setItem(
      "farmerProducts",
      JSON.stringify(oldProducts)
    );

    setMessage("Product added successfully!");

    setProduct({
      name: "",
      category: "",
      description: "",
      price: "",
      unit: "Kg",
      quantity: "",
      image: "",
      location: "",
    });

    e.target.reset();
  }

  return (
    <div className="form-page">
      <div className="product-form">

        <h1>➕ Add New Product</h1>

        <p>
          Add your agricultural product for customers.
        </p>

        {message && <p style={{ color: "green" }}>{message}</p>}

        <form onSubmit={handleSubmit}>

          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Example: Tomato"
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="crops">Crops</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="seeds">Seeds</option>
            <option value="pesticides">Pesticides</option>
          </select>

          <label>Product Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Describe your product"
            rows="4"
          />

          <label>Price per Unit</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Example: 40"
            min="1"
            required
          />

          <label>Unit</label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
          >
            <option value="Kg">Kg</option>
            <option value="Quintal">Quintal</option>
            <option value="Ton">Ton</option>
            <option value="Piece">Piece</option>
          </select>

          <label>Available Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1"
            required
          />

          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            placeholder="Village / District"
            required
          />

          <button type="submit" className="login-button">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
