"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BreedFilter from "./BreedFilter";

const API_URL = "https://api.thecatapi.com/v1/images/search";
const API_KEY = "DEMO-API-KEY";

interface CatImage {
  id: string;
  url: string;
}

interface Breed {
  id: string;
  name: string;
}

const CatGallery: React.FC = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  useEffect(() => {
    fetchBreeds();
    fetchCats();
  }, []);

  const fetchBreeds = async () => {
    try {
      const { data } = await axios.get<Breed[]>("https://api.thecatapi.com/v1/breeds", {
        headers: { "x-api-key": API_KEY },
      });
      setBreeds(data);
    } catch (err) {
      console.error("Error fetching breeds:", err);
    }
  };

  const fetchCats = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `${API_URL}?limit=9&breed_ids=${selectedBreed}`;
      const { data } = await axios.get<CatImage[]>(url, {
        headers: { "x-api-key": API_KEY },
      });

      setCats(data);
    } catch (err) {
      setError("Failed to load images. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 style={{color:"black"}} className="text-2xl font-bold text-center mb-4">🐱 Cat Gallery</h1>

      <BreedFilter breeds={breeds} setSelectedBreed={setSelectedBreed} fetchCats={fetchCats} />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        {cats.map((cat) => (
          <img key={cat.id} src={cat.url} alt="Cat" className="rounded-lg shadow-md" />
        ))}
      </div>

      <button
        onClick={fetchCats}
        className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default CatGallery;
