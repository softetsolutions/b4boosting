"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "src/components/ui/ImageUpload";

interface Settings {
  _id?: string;
  bannerImg?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  bannerRedirectionLink?: string;
  marqueeText?: string;
  marqueeLink?: string;
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  // 🔹 Fetch system settings
  const fetchSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to load settings");
      const data = await res.json();
      setSettings(data);
      setBannerPreview(data.bannerImg || null);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(error instanceof Error ? error.message : "Error loading settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      if (bannerFile) formData.append("bannerImg", bannerFile);
      if (settings.bannerTitle)
        formData.append("bannerTitle", settings.bannerTitle);
      if (settings.bannerSubtitle)
        formData.append("bannerSubtitle", settings.bannerSubtitle);
      if (settings.bannerRedirectionLink)
        formData.append(
          "bannerRedirectionLink",
          settings.bannerRedirectionLink
        );
      if (settings.marqueeText)
        formData.append("marqueeText", settings.marqueeText);
      if (settings.marqueeLink)
        formData.append("marqueeLink", settings.marqueeLink);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/settings`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update settings");

      setSettings(data.settings);
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error(error instanceof Error ? error.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">System Settings</h1>
        <p className="mt-2 text-gray-400">
          Manage banner and marquee settings for your platform
        </p>
      </div>

      {/* Banner Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">
          Banner Settings
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="items-center">
              <ImageUpload
                images={bannerPreview ? [bannerPreview] : []}
                onImagesChange={(imgs) => {
                  // Update preview and file for upload
                  if (imgs.length > 0) {
                    const first = imgs[0];
                    setBannerPreview(
                      typeof first === "string"
                        ? first
                        : URL.createObjectURL(first)
                    );
                    setBannerFile(first instanceof File ? first : null);
                  } else {
                    setBannerPreview(null);
                    setBannerFile(null);
                  }
                }}
                maxImages={1}
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-gray-300 mb-1 text-sm">
                Banner Title
              </label>
              <input
                type="text"
                value={settings.bannerTitle || ""}
                onChange={(e) =>
                  setSettings({ ...settings, bannerTitle: e.target.value })
                }
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 text-sm">
                Banner Subtitle
              </label>
              <input
                type="text"
                value={settings.bannerSubtitle || ""}
                onChange={(e) =>
                  setSettings({ ...settings, bannerSubtitle: e.target.value })
                }
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 text-sm">
                Banner Redirection Link
              </label>
              <input
                type="text"
                value={settings.bannerRedirectionLink || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    bannerRedirectionLink: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">
          Marquee Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Marquee Text
            </label>
            <input
              type="text"
              value={settings.marqueeText || ""}
              onChange={(e) =>
                setSettings({ ...settings, marqueeText: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Marquee Link
            </label>
            <input
              type="text"
              value={settings.marqueeLink || ""}
              onChange={(e) =>
                setSettings({ ...settings, marqueeLink: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          aria-label="Save Changes"
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            saving
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-500"
          }`}
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
