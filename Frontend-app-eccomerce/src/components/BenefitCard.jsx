export default function BenefitCard({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-8
        shadow-sm
        border
        border-slate-200
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      <div className="mb-5 text-[#1E3A5F]">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-3">
        {title}
      </h3>

      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}