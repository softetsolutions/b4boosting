"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "src/components/ui/ConfirmationModal";
import {
  fetchAllServices,
  deleteService,
  updateServiceVisibility,
} from "src/api/services";
import type { Service } from "src/api/services";

interface ManageServicesProps {
  onEditService?: (serviceId: string) => void;
}

export default function ManageServices({ onEditService }: ManageServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const services = await fetchAllServices();
      setServices(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    if (onEditService) {
      onEditService(serviceId);
    }
  };

  const handleDeleteClick = (serviceId: string, serviceName: string) => {
    setServiceToDelete({ id: serviceId, name: serviceName });
    setShowDeleteModal(true);
  };

  const handleToggleShowOnHome = async (
    serviceId: string,
    currentShowOnHome: boolean
  ) => {
    try {
      await updateServiceVisibility(serviceId, !currentShowOnHome);
      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceId
            ? { ...service, showOnHome: !currentShowOnHome }
            : service
        )
      );
      toast.success("Visibility updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update visibility");
    }
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setShowDeleteModal(false);
    try {
      await deleteService(serviceToDelete.id);
      setServices((prev) =>
        prev.filter((service) => service._id !== serviceToDelete.id)
      );
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setServiceToDelete(null);
    }
  };

  const renderIcon = (icon: string) => {
    if (!icon) {
      return (
        <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-lg">?</span>
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-700/50 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt="Service icon"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML =
                '<span class="text-gray-400 text-lg">?</span>';
            }
          }}
        />
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
        <h1 className="text-4xl font-bold text-white">Manage Services</h1>
        <p className="mt-2 text-gray-400">
          View and manage all services on your platform
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No services found</div>
          <p className="text-gray-500">
            Create your first service to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => handleServiceClick(service._id)}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {renderIcon(service.icon)}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Created {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service._id);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
                  title="Edit service"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(service._id, service.name);
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
                  title="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <label
                  className="flex items-center cursor-pointer ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={!!service.showOnHome}
                    onChange={() =>
                      handleToggleShowOnHome(service._id, !!service.showOnHome)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                      service.showOnHome ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        service.showOnHome ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`ml-2 text-xs font-semibold ${
                      service.showOnHome ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {service.showOnHome ? "Visible" : "Hidden"}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setServiceToDelete(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
