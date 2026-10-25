import "./AdminD.css"
import AddProduct from "./AddProduct";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

function AdminDashboard({
  products,
  setProducts,
}) {
  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) =>
      product.status === "Available"
  ).length;

  const outOfStockProducts = products.filter(
    (product) =>
      product.status === "Out of Stock"
  ).length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price) *
        Number(product.quantity),
    0
  );
  
  const quantityData = products.map((product) => ({
    name: product.name,
    quantity: product.quantity
  }));

  const statusData = [
    {
      name: "Available",
      value: availableProducts
    },
    {
      name: "Out Of Stock",
      value: outOfStockProducts
    }
  ];
  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="dashboard-card1">
          <h2>{availableProducts}</h2>
          <p>Available Products</p>
        </div>

        <div className="dashboard-card2">
          <h2>{outOfStockProducts}</h2>
          <p>Out Of Stock</p>
        </div>

        <div className="dashboard-card">
          <h2>₹{inventoryValue}</h2>
          <p>Inventory Value</p>
        </div>
      </div>

      
 <div className="charts-container">

        <div className="chart-card">
          <h2>Product Quantity</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={quantityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="quantity"
                fill="#9c27b0"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Product Status</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                label
                outerRadius={100}
              >
                {statusData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>



     <div className="add-product-section">
  <AddProduct
    products={products}
    setProducts={setProducts}
  />
</div>

      <div className="dashboard-table">
        <h2>Products Summary</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;