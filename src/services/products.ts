export async function getProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
