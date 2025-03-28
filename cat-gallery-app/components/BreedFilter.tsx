"use client";
import React from "react";

interface Breed {
  id: string;
  name: string;
}

interface BreedFilterProps {
  breeds: Breed[];
  setSelectedBreed: (breedId: string) => void;
  fetchCats: () => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ breeds, setSelectedBreed, fetchCats }) => {
  return (
    <div className="flex justify-center mb-4">
      <select
        onChange={(e) => {
          setSelectedBreed(e.target.value);
          fetchCats();
        }}
        style={{ border: "2px solid black", color: "black" }}
        className="p-2 rounded"
      >
        <option value="" style={{ color: "black" }}>All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id} style={{ color: "black" }}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;
