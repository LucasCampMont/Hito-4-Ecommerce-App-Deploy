export default function CategoryCard({ icon, title }) {
  return (
    <div
      className="
        w-40
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        flex
        flex-col
        items-center
        gap-3
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-2
        hover:border-slate-300
        transition-all
        duration-300
      "
    >
      <span className="text-[#1E3A5F] transition-transform duration-300">
        {icon}
      </span>

      <h3 className="font-medium text-slate-800">
        {title}
      </h3>
    </div>
  );
}