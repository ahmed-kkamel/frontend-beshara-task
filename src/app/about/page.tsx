
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Welcome to our e-commerce store! We started with a simple mission: to provide high-quality products
              at competitive prices while delivering exceptional customer service. Since our founding, we've been
              dedicated to curating a selection of products that meet our strict standards for quality and value.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We strive to make shopping easier and more enjoyable for our customers. Our commitment to
              excellence drives everything we do, from product selection to customer support.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="text-indigo-600 text-4xl font-bold mb-2">1000+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center p-4">
                <div className="text-indigo-600 text-4xl font-bold mb-2">50k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-4">
                <div className="text-indigo-600 text-4xl font-bold mb-2">99%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}