import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import placeHolderImg from "../../assets/images/placeholder_product_img.jpg";
import { api } from "../../services/api";

const ProductCard = ({ product, onDeleted }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onEditHandler = (productId, e) => {
    e.stopPropagation();
    navigate(`/products/${productId}/edit`);
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const onDeleteConfirm = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await api.delete(`products/${product.id}`);
      if (onDeleted) onDeleted(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const onDeleteCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <article
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/products/${product.id}/details`);
      }}
      className="bg-white rounded-xl shadow-md overflow-hidden max-w-xs flex flex-col transform-3d transition-transform duration-300 hover:scale-102 cursor-pointer "
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.imageUrl == null ? placeHolderImg : product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        {product.category && (
          <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 ">
        {/* Name & Price */}
        <div className="mb-2">
          <h3 className="text-base font-normal text-[#3f4249] leading-tight line-clamp-2">
            {product.name}
          </h3>
          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>
          <span className="text-2xl font-extrabold text-[#000000] mt-1 block">
            {Number(product.price).toLocaleString("fr-CM")} FCFA
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={(e) => onEditHandler(product.id, e)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            className="inline-flex items-center justify-center p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
            onClick={onDeleteClick}
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onDeleteCancel}
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
                onClick={onDeleteCancel}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteConfirm}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition cursor-pointer"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
