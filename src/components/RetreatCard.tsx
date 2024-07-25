import React from "react";


interface RetreatCardProps {
  retreat: {
    title: string;
    description: string;
    date: number;
    location: string;
    price: number;
    image: string;
  };
}

const RetreatCard: React.FC<RetreatCardProps> = ({ retreat }) => {
  const date = new Date(retreat.date * 1000).toLocaleDateString();
  return (
    <div className="border p-3 rounded-lg overflow-hidden shadow-lg bg-[#e0d9cf]">
      <img
        src={retreat.image}
        alt={retreat.title}
        className="w-full h-[12rem] rounded-3xl lg:w-[60%] mb-2"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{retreat.title}</h2>
        <p className="text-gray-700 mb-2">{retreat.description}</p>
        <p className="text-gray-600 mb-2">Date: {date}</p>
        <p className="text-gray-600 mb-2">Location: {retreat.location}</p>
        <p className="text-gray-600">Price: ${retreat.price}</p>
      </div>
    </div>
  );
};

export default RetreatCard;
