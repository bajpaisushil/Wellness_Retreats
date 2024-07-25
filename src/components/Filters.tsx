import React, { ChangeEvent, useRef, useState } from "react";

interface FiltersProps {
  onFilterChange: (filter: { type: string; date: string }) => void;
  onSearchChange: (search: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  onSearchChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef: React.RefObject<HTMLInputElement | any> = useRef<
    HTMLInputElement | any
  >(null);

  const handleFocus = () => {
    setIsFocused(true);
    (inputRef.current ?? {}).type = "date";
  };

  const handleBlur = () => {
    setIsFocused(false);
    (inputRef.current ?? {}).type = "text";
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ type: e.target.value, date: "" });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ type: "", date: e.target.value });
  };

  return (
    <div className="flex flex-col justify-between md:flex-row gap-4 mb-4 text-white">
      <div>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={isFocused ? "date" : "text"}
          onChange={handleDateChange}
          placeholder="Filter by Date"
          className="p-3 border rounded-lg lg:bg-[#1b3252] bg-white lg:text-white text-black lg:mr-6 w-full lg:w-fit"
        />
        <select
          onChange={handleTypeChange}
          className="p-3 border rounded-lg lg:bg-[#1b3252] bg-white lg:text-white text-black w-full lg:w-fit mt-4 lg:mt-0"
        >
          <option value="">Filter by Type</option>
          <option value="Yoga">Yoga</option>
          <option value="Meditation">Meditation</option>
          <option value="Detox">Detox</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search retreats by title ..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-4 border rounded-lg w-full lg:w-80 lg:placeholder:text-white placeholder:text-black lg:bg-[#1b3252] bg-white lg:text-white text-black"
      />
    </div>
  );
};

export default Filters;
