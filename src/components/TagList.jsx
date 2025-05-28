
const TagList = ({ tags }) => {
  const tagColors = {
    'Collector': 'bg-blue-100 text-blue-800 border-blue-200',
    'DeFi Trader': 'bg-green-100 text-green-800 border-green-200',
    'NFT Enthusiast': 'bg-purple-100 text-purple-800 border-purple-200',
    'Early Adopter': 'bg-orange-100 text-orange-800 border-orange-200',
    'Trader': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'HODLer': 'bg-gray-100 text-gray-800 border-gray-200',
    'Yield Farmer': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Liquidity Provider': 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  const getTagStyle = (tag) => {
    return tagColors[tag] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Persona Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getTagStyle(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
