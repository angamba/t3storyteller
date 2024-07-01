import React from "react";

interface CardTitleProps {
  title: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
  return <h2 className="text-left text-xl font-bold">{title}</h2>;
};

export default CardTitle;
