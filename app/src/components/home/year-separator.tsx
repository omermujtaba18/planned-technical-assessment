import React from "react";

interface YearSeparatorProps {
  year: number;
}

const YearSeparator: React.FC<YearSeparatorProps> = ({ year }) => {
  return (
    <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full my-5 py-2 font-extrabold text-white">
      {year}
    </div>
  );
};

export default YearSeparator;
