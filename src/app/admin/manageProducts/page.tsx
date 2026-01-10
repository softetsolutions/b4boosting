"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "src/components/ui/ConfirmationModal";
import { fetchAllProducts, deleteProduct } from "src/api/products";
import type { Product } from "src/api/products";
import Image from "next/image";
import {getImageSrc} from "src/utils/imageUtils";

interface ServiceGroup {
  serviceName: string;
  serviceId: string;
  products: Product[];
}

export default function ManageProducts() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [collapsedServices, setCollapsedServices] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await fetchAllProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Group products by service
  const groupedProducts = products.reduce((groups: ServiceGroup[], product) => {
    const serviceName = product.service?.name || "No Service";
    const serviceId = product.service?._id || "no-service";

    const existingGroup = groups.find((group) => group.serviceId === serviceId);

    if (existingGroup) {
      existingGroup.products.push(product);
    } else {
      groups.push({
        serviceName,
        serviceId,
        products: [product],
      });
    }

    return groups;
  }, []);

  const handleProductClick = (productId: string) => {
    // Navigate to edit page
    router.push(`/admin/products/${productId}`);
  };

  const handleDeleteClick = (productId: string, productTitle: string) => {
    setProductToDelete({ id: productId, title: productTitle });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setShowDeleteModal(false);
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productToDelete.id)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setProductToDelete(null);
    }
  };

  const toggleServiceCollapse = (serviceId: string) => {
    setCollapsedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const renderProductImage = (images: (string | File)[]) => {
    if (!images || images.length === 0) {
      return null;
    }

    const firstImage = images[0];
    return (
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50 flex items-center justify-center">
        {/* Static file URL is safe in Next.js */}
          {firstImage && (
        <Image
           src={getImageSrc(firstImage)}
          alt="Product image"
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Products</h1>
        <p className="mt-2 text-gray-400">
          View and manage all products on your platform
        </p>
      </div>

      {groupedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No products found</div>
          <p className="text-gray-500">
            Create your first product to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedProducts.map((serviceGroup) => (
            <div
              key={serviceGroup.serviceId}
              className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden"
            >
              {/* Service Header */}
              <div
                className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700 cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={() => toggleServiceCollapse(serviceGroup.serviceId)}
              >
                <div className="flex items-center space-x-3">
                  {collapsedServices.has(serviceGroup.serviceId) ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="text-xl font-semibold text-white">
                    {serviceGroup.serviceName}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                    {serviceGroup.products.length}{" "}
                    {serviceGroup.products.length === 1
                      ? "product"
                      : "products"}
                  </span>
                </div>
              </div>

              {/* Products Grid */}
              {!collapsedServices.has(serviceGroup.serviceId) && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceGroup.products.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleProductClick(product._id)}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {renderProductImage(product.images)}
                            <div className="flex-1">
                              <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {product.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                Type: {product.type}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {product.description || "No description available"}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Created{" "}
                            {new Date(product.createdAt).toLocaleDateString()}
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              aria-label="Edit Product"
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(product._id);
                              }}
                              className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              aria-label="Delete Product"
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(product._id, product.title);
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
