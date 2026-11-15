import { catalog, categoryById } from "../data/catalog";

const KEYS = {
  farmers: "farmers",
  customers: "customers",
  session: "agrimartSession",
  products: "farmerProducts",
  cart: "cart",
  orders: "orders",
  messages: "contactMessages",
  catalogStock: "catalogStock",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("agrimart-storage"));
}

export function getSession() {
  return read(KEYS.session, null);
}

export function logout() {
  localStorage.removeItem(KEYS.session);
}

function saveSession(role, user) {
  const session = {
    role,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    village: user.village || "",
    district: user.district || "",
    address: user.address || "",
  };
  write(KEYS.session, session);
  return session;
}

function userList(role) {
  return read(role === "farmer" ? KEYS.farmers : KEYS.customers, []);
}

function saveUserList(role, list) {
  write(role === "farmer" ? KEYS.farmers : KEYS.customers, list);
}

function validateAccount(user) {
  if (!user.name || user.name.trim().length < 2) {
    return "Enter your full name.";
  }
  if (!/^\d{10}$/.test(user.mobile || "")) {
    return "Enter a 10-digit mobile number.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email || "")) {
    return "Enter a valid email address.";
  }
  if (!user.password || user.password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  if (user.confirm !== undefined && user.password !== user.confirm) {
    return "Password and confirm password must match.";
  }
  return "";
}

export function registerUser(role, input) {
  const message = validateAccount(input);
  if (message) return { ok: false, message };
  if (role === "farmer" && (!input.village || !input.district)) {
    return { ok: false, message: "Enter your village and district." };
  }
  if (role === "customer" && (!input.address || input.address.trim().length < 5)) {
    return { ok: false, message: "Enter your address." };
  }

  const list = userList(role);
  const email = input.email.trim().toLowerCase();
  if (list.some((user) => user.email.toLowerCase() === email)) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const saved = {
    name: input.name.trim(),
    mobile: input.mobile.trim(),
    email,
    password: input.password,
    village: input.village?.trim() || "",
    district: input.district?.trim() || "",
    address: input.address?.trim() || "",
  };
  list.push(saved);
  saveUserList(role, list);
  saveSession(role, saved);
  return { ok: true };
}

export function loginWithEmail(role, email, password) {
  if (!email || !password) {
    return { ok: false, message: "Enter your email and password." };
  }
  const user = userList(role).find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );
  if (!user) {
    return { ok: false, message: "Email or password is incorrect." };
  }
  saveSession(role, user);
  return { ok: true };
}

export function requestOtp(role, mobile) {
  if (!/^\d{10}$/.test(mobile || "")) {
    return { ok: false, message: "Enter the 10-digit mobile number you registered." };
  }
  const user = userList(role).find((item) => item.mobile === mobile);
  if (!user) {
    return { ok: false, message: "No account is registered with this mobile number." };
  }
  const code = String(Math.floor(1000 + Math.random() * 9000));
  sessionStorage.setItem(
    "agrimartOtp",
    JSON.stringify({
      role,
      mobile,
      code,
      expires: Date.now() + 5 * 60 * 1000,
    })
  );
  return {
    ok: true,
    code,
    message: "No SMS service is connected. Use the code shown here. It expires in 5 minutes.",
  };
}

export function verifyOtp(role, mobile, code) {
  const raw = sessionStorage.getItem("agrimartOtp");
  if (!raw) return { ok: false, message: "Request a code first." };
  const otp = JSON.parse(raw);
  if (
    otp.role !== role ||
    otp.mobile !== mobile ||
    otp.code !== String(code).trim() ||
    Date.now() > otp.expires
  ) {
    return { ok: false, message: "That code is incorrect or has expired." };
  }
  const user = userList(role).find((item) => item.mobile === mobile);
  sessionStorage.removeItem("agrimartOtp");
  saveSession(role, user);
  return { ok: true };
}

export function resetPassword(role, email, password, confirm) {
  if (password !== confirm) {
    return { ok: false, message: "Password and confirm password must match." };
  }
  if (!password || password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters." };
  }
  const list = userList(role);
  const index = list.findIndex(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (index === -1) {
    return { ok: false, message: "No account is registered with this email." };
  }
  list[index] = { ...list[index], password };
  saveUserList(role, list);
  return { ok: true, message: "Password updated. You can log in now." };
}

function normalize(product, source) {
  const category = categoryById(product.category);
  const quantity = Number(product.quantity ?? product.available ?? 0);
  return {
    ...product,
    id: String(product.id),
    source,
    price: Number(product.price),
    quantity,
    available: Number(product.available ?? quantity),
    unit: product.unit || "Kg",
    farmer: product.farmerName || product.farmer || "Registered Farmer",
    farmerEmail: product.farmerEmail || "",
    icon: product.icon || category?.icon || "🌾",
    image: product.image || "",
    description: product.description || "Added by a farmer on AgriMart.",
    location: product.location || "Local farm",
  };
}

export function getFarmerProducts() {
  return read(KEYS.products, []).map((product) => normalize(product, "farmer"));
}

export function getAllProducts() {
  const stock = read(KEYS.catalogStock, {});
  const samples = catalog.map((product) => {
    const quantity =
      stock[product.id] !== undefined ? Number(stock[product.id]) : product.quantity;
    return normalize({ ...product, quantity, available: quantity }, "catalog");
  });
  return [...samples, ...getFarmerProducts()];
}

export function getProductsByCategory(category) {
  return getAllProducts().filter((product) => product.category === category);
}

export function getProduct(category, id) {
  const list = getProductsByCategory(category);
  return (
    list.find((product) => product.id === String(id)) ||
    list[Number(id)] ||
    null
  );
}

export function saveFarmerProduct(product, existingId) {
  const session = getSession();
  const stored = read(KEYS.products, []);
  const next = {
    ...product,
    price: Number(product.price),
    quantity: Number(product.quantity),
    farmerEmail: session?.email || product.farmerEmail || "",
    farmerName: session?.name || product.farmerName || "Registered Farmer",
    farmer: session?.name || product.farmer || "Registered Farmer",
  };

  if (existingId) {
    const index = stored.findIndex((item) => String(item.id) === String(existingId));
    if (index === -1) return { ok: false, message: "Product not found." };
    const owner = stored[index].farmerEmail;
    if (owner && session && owner !== session.email) {
      return { ok: false, message: "You can edit only your own products." };
    }
    stored[index] = { ...stored[index], ...next, id: stored[index].id };
  } else {
    stored.push({ ...next, id: Date.now() });
  }

  write(KEYS.products, stored);
  return { ok: true };
}

export function deleteFarmerProduct(id) {
  const session = getSession();
  const stored = read(KEYS.products, []).filter((product) => {
    if (String(product.id) !== String(id)) return true;
    if (product.farmerEmail && session && product.farmerEmail !== session.email) {
      return true;
    }
    return false;
  });
  write(KEYS.products, stored);
  return stored.map((product) => normalize(product, "farmer"));
}

export function ownProducts(email) {
  return getFarmerProducts().filter(
    (product) => !product.farmerEmail || product.farmerEmail === email
  );
}

export function getCart() {
  return read(KEYS.cart, []);
}

export function saveCart(cart) {
  write(KEYS.cart, cart);
  return cart;
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const qty = Math.max(1, Number(quantity) || 1);
  const index = cart.findIndex((item) => String(item.id) === String(product.id));
  const available = Number(product.available ?? product.quantity ?? 99);

  if (index >= 0) {
    cart[index] = {
      ...cart[index],
      quantity: Math.min(available, cart[index].quantity + qty),
      available,
    };
  } else {
    cart.push({
      id: String(product.id),
      category: product.category,
      name: product.name,
      price: Number(product.price),
      unit: product.unit,
      icon: product.icon || "🌾",
      image: product.image || "",
      farmer: product.farmer,
      farmerEmail: product.farmerEmail || "",
      available,
      quantity: Math.min(available, qty),
    });
  }

  return saveCart(cart);
}

export function cartTotals(cart = getCart()) {
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const delivery = subtotal === 0 || subtotal >= 500 ? 0 : 40;
  return { subtotal, delivery, grand: subtotal + delivery };
}

export function placeOrder(customer, cart) {
  const session = getSession();
  if (session?.role !== "customer") {
    return { ok: false, message: "Sign in with a customer account to place an order." };
  }
  if (!cart.length) {
    return { ok: false, message: "Your cart is empty." };
  }

  for (const item of cart) {
    const current = getProduct(item.category, item.id);
    if (!current || Number(current.available) < Number(item.quantity)) {
      return {
        ok: false,
        message: `${item.name} no longer has the requested quantity in stock. Update your cart and try again.`,
      };
    }
  }

  const totals = cartTotals(cart);
  const order = {
    id: Date.now(),
    items: cart.map((item) => ({ ...item, status: "Order Placed" })),
    customer: {
      ...customer,
      email: session?.role === "customer" ? session.email : customer.email || "",
    },
    subtotal: totals.subtotal,
    delivery: totals.delivery,
    total: totals.grand,
    status: "Order Placed",
    date: new Date().toLocaleString(),
  };

  const orders = read(KEYS.orders, []);
  orders.unshift(order);
  write(KEYS.orders, orders);
  write(KEYS.cart, []);

  const products = read(KEYS.products, []);
  const stock = read(KEYS.catalogStock, {});
  order.items.forEach((item) => {
    const index = products.findIndex((product) => String(product.id) === String(item.id));
    if (index >= 0) {
      products[index].quantity = Math.max(
        0,
        Number(products[index].quantity) - Number(item.quantity)
      );
      return;
    }
    const sample = catalog.find((product) => product.id === String(item.id));
    if (sample) {
      const current =
        stock[sample.id] !== undefined ? Number(stock[sample.id]) : sample.quantity;
      stock[sample.id] = Math.max(0, current - Number(item.quantity));
    }
  });
  write(KEYS.products, products);
  write(KEYS.catalogStock, stock);
  return { ok: true, order };
}

export function getCustomerOrders() {
  const session = getSession();
  const orders = getOrders();
  if (session?.role !== "customer") return orders;
  return orders.filter((order) => {
    const email = order.customer?.email || "";
    return email.toLowerCase() === session.email.toLowerCase();
  });
}

export function getOrders() {
  return read(KEYS.orders, []);
}

export function getOrder(id) {
  return getCustomerOrders().find((order) => String(order.id) === String(id)) || null;
}

export function getFarmerOrders(email) {
  return getOrders().filter((order) =>
    order.items.some((item) => item.farmerEmail && item.farmerEmail === email)
  );
}

export function updateFarmerOrderStatus(orderId, email, status) {
  const orders = getOrders().map((order) => {
    if (String(order.id) !== String(orderId)) return order;
    const items = order.items.map((item) =>
      item.farmerEmail === email ? { ...item, status } : item
    );
    const statuses = [...new Set(items.map((item) => item.status || order.status))];
    return {
      ...order,
      items,
      status: statuses.length === 1 ? statuses[0] : "Partially updated",
    };
  });
  write(KEYS.orders, orders);
  return orders.filter((order) =>
    order.items.some((item) => item.farmerEmail === email)
  );
}

export function saveContactMessage(input) {
  if (!input.name || input.name.trim().length < 2) {
    return { ok: false, message: "Enter your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email || "")) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (!input.message || input.message.trim().length < 10) {
    return { ok: false, message: "Write a message of at least 10 characters." };
  }
  const messages = read(KEYS.messages, []);
  messages.unshift({
    id: Date.now(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    date: new Date().toLocaleString(),
  });
  write(KEYS.messages, messages);
  return { ok: true, message: "Thank you. Your message has been received." };
}

export function filterProducts(list, query) {
  const text = (query || "").trim().toLowerCase();
  if (!text) return list;
  return list.filter((product) =>
    `${product.name} ${product.description} ${product.farmer} ${product.category}`
      .toLowerCase()
      .includes(text)
  );
}

export function sortProducts(list, sort) {
  const copy = [...list];
  if (sort === "low") copy.sort((a, b) => a.price - b.price);
  if (sort === "high") copy.sort((a, b) => b.price - a.price);
  if (sort === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}
