
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ScoreChart = ({ scores }) => {
  const data = [
    {
      name: 'Risk Score',
      value: scores.risk,
      color: '#ef4444'
    },
    {
      name: 'NFT Activity',
      value: scores.nft,
      color: '#8b5cf6'
    },
    {
      name: 'DeFi Usage',
      value: scores.defi,
      color: '#10b981'
    },
    {
      name: 'Overall Activity',
      value: scores.activity,
      color: '#3b82f6'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            Score: {payload[0].value}/100
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { fill, ...rest } = props;
    return <Bar {...rest} fill={props.payload.color} />;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            className="dark:fill-gray-400"
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            className="dark:fill-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            shape={<CustomBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
