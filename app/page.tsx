const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/public/products`, {
       next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {product.thumb_image && (
                  <img 
                    src={product.thumb_image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.sku}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${product.price?.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}