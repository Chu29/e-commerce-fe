import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchCategories } from "../services/category.service";
import { createProduct, uploadProductImage } from "../services/product.service";

const NewProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    imageUrl: "",
    stockQuantity: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories ?? data);
      } catch {
        console.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear file selection when user types a URL
    if (name === "imageUrl" && value) {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/avif",
    ];
    if (!validTypes.includes(file.type)) {
      setError(
        "Please select a valid image file (JPEG, PNG, GIF, WebP, or AVIF)",
      );
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image file must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    // Clear the URL field since we're using a local file
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setError(null);
  };

  const clearFileSelection = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (formData.imageUrl && formData.imageUrl.length > 2048) {
        setError("Image URL is too long (max 2048 characters)");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: formData.name,
        price: parseFloat(formData.price) || 0,
        description: formData.description || undefined,
        categoryId: formData.categoryId
          ? parseInt(formData.categoryId, 10)
          : undefined,
        stockQuantity: formData.stockQuantity
          ? parseInt(formData.stockQuantity, 10)
          : 0,
        imageUrl: formData.imageUrl || undefined,
      };

      const result = await createProduct(payload);

      // If a local file was selected, upload it to the new product
      if (imageFile && result?.product?.id) {
        setIsUploading(true);
        try {
          await uploadProductImage(result.product.id, imageFile);
        } catch {
          // Product was created but image upload failed — still navigate
          console.error("Image upload failed, but product was created");
        } finally {
          setIsUploading(false);
        }
      }

      navigate("/products");
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidImageUrl =
    formData.imageUrl &&
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|avif)/i.test(formData.imageUrl);

  const hasImage = isValidImageUrl || imagePreview;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mx-auto mb-6 max-w-2xl text-sm">
        <Link
          to="/products"
          className="font-medium text-indigo-600 hover:text-indigo-800"
        >
          Products
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-600">Create New Product</span>
      </nav>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          New Product Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the information below to add a new product to your store
          catalog.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Product Name */}
        <fieldset className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Minimalist Wireless Headphones"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
            />
          </div>

          {/* Price + Category row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Base Price (FCFA)
              </label>
              <div className="relative">
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label
              htmlFor="stockQuantity"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition sm:max-w-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the key features, technical specifications, and materials..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Product Image URL
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </span>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={imageFile ? imageFile.name : formData.imageUrl}
                  onChange={handleChange}
                  disabled={!!imageFile}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Upload file button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  imageFile
                    ? clearFileSelection()
                    : fileInputRef.current?.click()
                }
                title={imageFile ? "Remove file" : "Upload from device"}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
                  imageFile
                    ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-gray-300 bg-white text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {imageFile ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                )}
              </button>

              {isValidImageUrl && !imageFile && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* Image Preview */}
          <div className="overflow-hidden rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-6">
            {hasImage ? (
              <img
                src={imagePreview || formData.imageUrl}
                alt="Product preview"
                className="mx-auto max-h-56 rounded-lg object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-10 w-10 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-indigo-400">
                  Preview will appear here once image URL is provided
                </p>
              </div>
            )}
          </div>
        </fieldset>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <Link
            to="/products"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {isSubmitting || isUploading ? (
              <>
                <ClipLoader size={16} color="#ffffff" />
                {isUploading ? "Uploading image…" : "Saving…"}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
