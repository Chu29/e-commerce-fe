import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import placeHolderImg from "../assets/images/placeholder_product_img.jpg";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-xs flex flex-col">
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
      <div className="p-4 flex flex-col flex-1">
        {/* Name & Price */}
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">
            {Number(product.price).toLocaleString("fr-CM")} FCFA
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <FiEdit2 className="w-4 h-4" />
            Edit
          </button>
          <button className="inline-flex items-center justify-center p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
