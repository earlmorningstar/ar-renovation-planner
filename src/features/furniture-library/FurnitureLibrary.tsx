"use client";

import { useState } from "react";
import { GLTF } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

type FurnitureItemType = {
  id: string;
  name: string;
  modelUrl: string;
  price: number;
  category: string;
};

const FurnitureItem = ({
  item,
  isSelected,
  onSelect,
}: {
  item: FurnitureItemType;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition ${
        isSelected
          ? "border-primary shadow-md bg-primary bg-opacity-10"
          : "border-gray-200 hover:shadow"
      }`}
      onClick={onSelect}
    >
      <h3 className="font-medium">{item.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        ${item.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        {item.category}
      </p>
    </div>
  );
};

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search furniture..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div className="absolute left-3 top-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default function FurnitureLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<FurnitureItemType | null>(
    null
  );

  const furnitureItems: FurnitureItemType[] = [
    {
      id: "1",
      name: "Modern Sofa",
      modelUrl: "/models/sofa.glb",
      price: 899,
      category: "living-room",
    },
    {
      id: "2",
      name: "Dining Table",
      modelUrl: "/models/table.glb",
      price: 1200,
      category: "dining",
    },
    {
      id: "3",
      name: "Queen Bed",
      modelUrl: "/models/bed.glb",
      price: 1500,
      category: "bedroom",
    },
    {
      id: "4",
      name: "Office Chair",
      modelUrl: "/models/chair.glb",
      price: 350,
      category: "office",
    },
    {
      id: "5",
      name: "Bookshelf",
      modelUrl: "/models/bookshelf.glb",
      price: 450,
      category: "living-room",
    },
    {
      id: "6",
      name: "Coffee Table",
      modelUrl: "/models/coffee-table.glb",
      price: 250,
      category: "living-room",
    },
  ];

  const filteredItems = furnitureItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-secondary bg-opacity-10">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {filteredItems.map((item) => (
              <FurnitureItem
                key={item.id}
                item={item}
                isSelected={selectedItem?.id === item.id}
                onSelect={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>

        <div className="w-2/3">
          {selectedItem ? (
            <div className="h-full">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <Model modelUrl={selectedItem.modelUrl} />
              </Canvas>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a furniture item to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl) as GLTF;
  return <primitive object={scene} />;
}
