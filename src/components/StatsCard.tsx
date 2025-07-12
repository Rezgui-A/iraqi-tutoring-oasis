interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}

const StatsCard = ({ title, value, subtitle, bgColor, textColor }: StatsCardProps) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className={`text-2xl font-bold ${textColor} mb-1`}>{value}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
