import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import Logo from "../components/atoms/Logo";
import Header from "../components/atoms/Header";
import { fetchProductById } from "../services/product.service";
import { api } from "../services/api";
import placeHolderImg from "../assets/images/placeholder_product_img.jpg";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProductById(id);
        setProduct(res.product ?? res);
      } catch {
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`products/${id}`);
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (isLoading) {
    return (
      <>
        <Header>
          <Logo />
        </Header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <ClipLoader color="#3b3bf5" size={40} />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header>
          <Logo />
        </Header>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-gray-500">{error ?? "Product not found"}</p>
          <Link
            to="/products"
            className="text-[#3b3bf5] hover:underline flex items-center gap-1"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </>
    );
  }

  const imgSrc = product.imageUrl || placeHolderImg;

  return (
    <>
      <Header>
        <Logo />
      </Header>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 px-4 sm:px-8 py-4 text-sm text-gray-500">
        <Link
          to="/products"
          className="flex items-center gap-1 text-gray-600 hover:text-[#3b3bf5] transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <span>/</span>
        <span className="text-gray-400">Inventory Management</span>
      </nav>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: image + thumbnails */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-6 min-h-64">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full max-h-80 object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer ${
                  activeThumb === i
                    ? "border-[#3b3bf5]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={imgSrc}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div className="flex flex-col gap-4">
          {/* Category badge */}
          {product.category && (
            <span className="inline-block self-start text-xs font-bold uppercase tracking-widest text-[#3b3bf5] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              {product.category.name}
            </span>
          )}

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-[#3b3bf5]">
              {Number(product.price).toLocaleString("fr-CM")} FCFA
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-gray-100 py-4 mt-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                SKU Identification
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {product.sku ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Current Stock
              </p>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    product.stockQuantity > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {product.stockQuantity} Units
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Date Created
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(product.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Status
              </p>
              <p
                className={`text-sm font-semibold ${
                  product.isActive ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate(`/products/${id}/edit`)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#3b3bf5] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a2ae0] transition-colors cursor-pointer"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Product Details
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-2 border border-red-400 text-red-500 px-5 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors cursor-pointer"
            >
              <FiTrash2 className="w-4 h-4" />
              Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <FiTrash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-900">
              Delete Product
            </h3>
            <p className="mt-2 text-center text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">{product.name}</span>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition cursor-pointer"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
