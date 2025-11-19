// app/become-seller/page.tsx
import BecomeSellerForm from "src/components/Seller/BecomeSellerForm";

export default function BecomeSellerPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Become a Seller
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Fill in your personal and billing details. Our team will review your
          request shortly.
        </p>
        <BecomeSellerForm />
      </div>
    </div>
  );
}
