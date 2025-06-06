"use client";

import { useState } from "react";
import { useStore } from "@/stores/projectStore";
import { FurnitureItem } from "@/stores/projectStore";

export default function AIDesignAdvisor() {
  const { projectData } = useStore();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getSuggestions = async () => {
    setIsLoading(true);
    setError("");

    try {
      //simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //mock suggestions based on room type
      const mockSuggestions = {
        living: [
          "Add a larger area rug to define the seating area",
          "Consider adding ambient lighting for a cozy atmosphere",
          "A statement plant would bring life to this space",
        ],
        kitchen: [
          "Open shelving could create a more spacious feel",
          "Consider a kitchen island for additional workspace",
          "Under-cabinet lighting would improve functionality",
        ],
        bedroom: [
          "Layered lighting would enhance the ambiance",
          "Consider a bench at the foot of the bed",
          "A larger rug under the bed would create warmth",
        ],
      };

      //determine room type
      const roomType = projectData.items.some(
        (i: FurnitureItem) => i.category === "bed"
      )
        ? "bedroom"
        : projectData.items.some((i: FurnitureItem) => i.category === "oven")
        ? "kitchen"
        : "living";

      setSuggestions(
        mockSuggestions[roomType as keyof typeof mockSuggestions] || []
      );
    } catch (err: unknown) {
      console.error("Error getting suggestions:", err);
      setError("Failed to get suggestions. Please try again.");
      if (err instanceof Error) {
        console.error("Error details:", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">AI Design Suggestions</h2>
        <button
          onClick={getSuggestions}
          disabled={isLoading}
          className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Get Suggestions"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4 space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-secondary bg-opacity-10 rounded-lg flex items-start"
            >
              <span className="mr-2 text-secondary">•</span>
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
