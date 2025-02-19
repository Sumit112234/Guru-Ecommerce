import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
        <h1 className="text-5xl font-bold text-purple-900 mb-8 text-center hover:text-purple-700 transition-colors duration-300">
          About Guru Electronics
        </h1>
        
        <section className="mb-12 hover:transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded in 2000, Guru Electronics has grown from a small local shop to one of the most trusted names in consumer electronics retail. Our journey began with a simple mission: to provide high-quality electronics at competitive prices while delivering exceptional customer service.
          </p>
        </section>

        <section className="mb-12 hover:transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We strive to be your trusted partner in technology, offering expert guidance and top-tier products that enhance your digital lifestyle. Our commitment to excellence drives us to carefully curate our product selection and continuously improve our service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 hover:border-purple-600">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Expert Support</h3>
              <p className="text-gray-700">Our team of certified technicians and product specialists is here to help you make informed decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 hover:border-purple-600">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Quality Products</h3>
              <p className="text-gray-700">We partner with leading brands to offer you the best in electronics and technology.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 hover:border-purple-600">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Customer First</h3>
              <p className="text-gray-700">Your satisfaction is our priority, backed by our hassle-free return policy and dedicated support.</p>
            </div>
          </div>
        </section>

        <section className="hover:transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Contact Us</h2>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-700 mb-2 hover:text-purple-600 transition-colors duration-300">Email: support@guruelectronics.com</p>
            <p className="text-gray-700 mb-2 hover:text-purple-600 transition-colors duration-300">Phone: 9301819492</p>
            <p className="text-gray-700 hover:text-purple-600 transition-colors duration-300">Address: Sikandar kampoo, Gwalior, Madhya Pradesh</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
        <h1 className="text-5xl font-bold text-purple-900 mb-8 text-center hover:text-purple-700 transition-colors duration-300">
          Terms and Conditions
        </h1>
        
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-gray-700 mb-4">
            Welcome to Guru Electronics. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">1. Use License</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Permission is granted to temporarily download one copy of the materials on Guru Electronics's website for personal, non-commercial transitory viewing only.
            </p>
            <p>
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li className="hover:text-purple-600 transition-colors duration-300">Modify or copy the materials</li>
              <li className="hover:text-purple-600 transition-colors duration-300">Use the materials for any commercial purpose</li>
              <li className="hover:text-purple-600 transition-colors duration-300">Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">2. Disclaimer</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The materials on Guru Electronics's website are provided on an 'as is' basis. Guru Electronics makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>
        </section>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">3. Privacy Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Your use of Guru Electronics's website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
            </p>
          </div>
        </section>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">4. Governing Law</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </section>

        <section>
          <p className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300">
            Last updated: February 16, 2025
          </p>
        </section>
      </div>
    </div>
  );
};

export { AboutPage, TermsPage };