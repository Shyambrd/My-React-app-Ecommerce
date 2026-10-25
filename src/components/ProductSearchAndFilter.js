
export default function ProductInventory() {
  const { useState } = React;

  const initialProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10, status: 'Available' },
    { id: 2, name: 'Mobile', category: 'Electronics', quantity: 0, status: 'Out of Stock' },
    { id: 3, name: 'Chair', category: 'Furniture', quantity: 5, status: 'Available' },
    { id: 4, name: 'Table', category: 'Furniture', quantity: 2, status: 'Available' }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const updateQuantity = (id, change) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const qty = Math.max(0, p.quantity + change);
          return {
            ...p,
            quantity: qty,
            status: qty > 0 ? 'Available' : 'Out of Stock'
          };
        }
        return p;
      })
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity}</p>
              <p
                className={product.status === 'Available' ? 'text-green-600' : 'text-red-600'}
              >
                {product.status}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                -
              </button>

              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
