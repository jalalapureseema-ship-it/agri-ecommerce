import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FarmerNav from "../../components/FarmerNav";
import { categories } from "../../data/catalog";
import { getSession, ownProducts, saveFarmerProduct } from "../../utils/storage";

const empty = {
  name: "",
  category: "",
  description: "",
  price: "",
  unit: "Kg",
  quantity: "",
  image: "",
  location: "",
};

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Choose an image file."));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Choose an image smaller than 5 MB."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Your browser could not process that image."));
          return;
        }
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = () => reject(new Error("Could not read that image."));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = id
    ? ownProducts(getSession()?.email || "").find((item) => String(item.id) === String(id))
    : null;
  const [product, setProduct] = useState(() => existing ? {
      name: existing.name,
      category: existing.category,
      description: existing.description,
      price: existing.price,
      unit: existing.unit || "Kg",
      quantity: existing.quantity,
      image: existing.image || "",
      location: existing.location || "",
    } : empty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(() => id && !existing ? "That product is not in your listings." : "");

  function handleChange(event) {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  async function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const image = await readImage(file);
      setProduct((current) => ({ ...current, image }));
      setError("");
    } catch (imageError) {
      setError(imageError.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!product.name.trim() || !product.category) {
      setError("Enter a product name and category.");
      return;
    }
    if (product.description.trim().length < 10) {
      setError("Add a description of at least 10 characters.");
      return;
    }
    if (Number(product.price) < 1 || Number(product.quantity) < 1) {
      setError("Price and quantity must be at least 1.");
      return;
    }

    const result = saveFarmerProduct(product, id);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    if (editing) {
      navigate("/farmer/products");
      return;
    }

    setError("");
    setMessage("Product added successfully!");
    setProduct(empty);
    event.target.reset();
  }

  return (
    <div className="form-page">
      <FarmerNav />
      <div className="product-form">
        <h1>{editing ? "✏️ Edit Product" : "➕ Add New Product"}</h1>
        <p>Add your agricultural product for customers.</p>
        {message && <p className="form-success" role="status">{message}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="product-name">Product Name</label>
          <input id="product-name" name="name" value={product.name} onChange={handleChange} placeholder="Example: Tomato" required />

          <label htmlFor="product-category">Category</label>
          <select id="product-category" name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <label htmlFor="product-description">Product Description</label>
          <textarea id="product-description" name="description" value={product.description} onChange={handleChange} placeholder="Describe your product" rows="4" required />

          <label htmlFor="product-price">Price per Unit</label>
          <input id="product-price" type="number" name="price" value={product.price} onChange={handleChange} placeholder="Example: 40" min="1" required />

          <label htmlFor="product-unit">Unit</label>
          <select id="product-unit" name="unit" value={product.unit} onChange={handleChange}>
            <option value="Kg">Kg</option>
            <option value="Quintal">Quintal</option>
            <option value="Ton">Ton</option>
            <option value="Piece">Piece</option>
            <option value="Pack">Pack</option>
            <option value="Bottle">Bottle</option>
            <option value="Dozen">Dozen</option>
          </select>

          <label htmlFor="product-quantity">Available Quantity</label>
          <input id="product-quantity" type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Enter quantity" min="1" required />

          <label htmlFor="product-image">Product Image</label>
          <input id="product-image" type="file" accept="image/*" onChange={handleImage} />
          {product.image && <img className="upload-preview" src={product.image} alt="Selected product" />}

          <label htmlFor="product-location">Location</label>
          <input id="product-location" name="location" value={product.location} onChange={handleChange} placeholder="Village / District" required />

          <button type="submit" className="login-button">
            {editing ? "Save Changes" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
