import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { DrawingContext} from "../../context_providers/drawingContext";





const VegetationChart: React.FC = () => {
    const vegetationData = useContext(DrawingContext)?.vegetationData || [];

    if (vegetationData.length === 0) {
        return <div></div>;
    }
  // Sort data by year+month for correct timeline order
  const sortedData = [...vegetationData].sort(
    (a, b) => new Date(a.year, a.month - 1).getTime() - new Date(b.year, b.month - 1).getTime()
  );

  // Format X-axis as "Month Year"
  const formattedData = sortedData.map(d => ({
    ...d,
    date: `${d.month_name} ${d.year}`
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Legend />

        {/* NDVI */}
        <Line type="monotone" dataKey="NDVI" stroke="#2ca02c" strokeWidth={2} dot />

        {/* EVI */}
        <Line type="monotone" dataKey="EVI" stroke="#1f77b4" strokeWidth={2} dot />

        {/* NDWI */}
        <Line type="monotone" dataKey="NDWI" stroke="#ff7f0e" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VegetationChart;
