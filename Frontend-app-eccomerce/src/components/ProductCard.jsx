function ProductCard({ image, name, price, rating }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-100">
      <div className="h-52 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 truncate group-hover:text-[#1E3A5F] transition">
          {name}
        </h3>

        <div className="flex items-center gap-1 text-yellow-400 text-sm mt-2">
          {"★".repeat(Math.floor(rating || 4))}
          <span className="text-slate-400 ml-2 text-xs">
            ({rating || 4.0})
          </span>
        </div>

        <p className="text-xl font-bold text-slate-900 mt-3">
          ${price}
        </p>

        <p className="text-sm text-slate-500 mt-3">
          Ver detalle →
        </p>
      </div>
    </div>
  );
}

export default ProductCard;