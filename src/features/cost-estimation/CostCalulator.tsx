"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/stores/projectStore";
import type { FurnitureItem } from "@/stores/projectStore";

export default function CostCalculator() {
  const { selectedItems } = useStore();
  const [totalCost, setTotalCost] = useState(0);
  const [taxRate, setTaxRate] = useState(0.08); //default 8% tax
  const [shippingCost, setShippingCost] = useState(50); //default shipping cost

  useEffect(() => {
    const subtotal = selectedItems.reduce(
      (sum: number, item: FurnitureItem) => sum + (item.price || 0),
      0
    );
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;
    setTotalCost(total);
  }, [selectedItems, taxRate, shippingCost]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Cost Estimation</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>
            $
            {selectedItems
              .reduce((sum, item) => sum + (item.price || 0), 0)
              .toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax ({taxRate * 100}%):</span>
          <span>
            $
            {(
              selectedItems.reduce((sum, item) => sum + (item.price || 0), 0) *
              taxRate
            ).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate * 100}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) / 100)}
            min="0"
            max="30"
            step="0.1"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Shipping Cost ($)
          </label>
          <input
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(parseFloat(e.target.value))}
            min="0"
            max="500"
            step="5"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
