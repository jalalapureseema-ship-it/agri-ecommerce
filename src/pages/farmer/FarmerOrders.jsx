function FarmerOrders() {
  return (
    <div className="dashboard-page">

      <h1>🛒 Customer Orders</h1>

      <p>
        Orders received for your products will appear here.
      </p>

      <div className="empty-products">

        <div>🛒</div>

        <h2>No Orders Yet</h2>

        <p>
          You don't have any customer orders yet.
        </p>

      </div>

    </div>
  );
}

export default FarmerOrders;