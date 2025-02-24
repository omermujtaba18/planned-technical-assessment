import React from "react";

interface MonthSeparatorProps {
  year: string;
}

const MonthSeparator: React.FC<MonthSeparatorProps> = ({ year }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="text-center bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg p-2 font-extrabold text-white w-40">
        {year}
      </div>
      <div className="w-full border-b-2 border-purple-400"></div>
    </div>
  );
};

export default MonthSeparator;
