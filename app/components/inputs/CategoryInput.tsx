"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  onClick: (value: string) => void;
  icon: IconType;
  selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  onClick,
  icon: Icon,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
