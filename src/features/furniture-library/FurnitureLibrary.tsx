"use client";

import { useState } from "react";
import { GLTF } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import SearchBar from "./components/FurnitureItem";

type FurnitureItemType = {
  id: string;
  name: string;
  modelUrl: string;
  price: number;
  category: string;
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
            {filteredItems.map(item => (
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

function Model({modelUrl}: {modeUrl: string}) {
    const {scene} = useGLTF(modelUrl) as GLTF;
    return <primitive object={scene}/>
}
