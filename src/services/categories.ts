export async function getCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function getCategoryProducts(category: string) {
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}