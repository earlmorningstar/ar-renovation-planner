import { create } from "zustand";

export type FurnitureItem = {
  id: string;
  name: string;
  price: number;
  position: [number, number, number];
  rotation: [number, number, number];
  modelUrl: string;
  category: string;
};

type ProjectState = {
  selectedItems: FurnitureItem[];
  addItem: (item: FurnitureItem) => void;
  removeItem: (id: string) => void;
  updateItemPosition: (id: string, position: [number, number, number]) => void;
  updateItemRotation: (id: string, position: [number, number, number]) => void;
  projectData: {
    name: string;
    items: FurnitureItem[];
    createdAt: string;
  };
};

export const useStore = create<ProjectState>((set) => ({
  selectedItems: [],
  addItem: (item) =>
    set((state) => ({
      selectedItems: [...state.selectedItems, item],
      projectData: {
        ...state.projectData,
        items: [...state.projectData.items, item],
      },
    })),
  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
      projectData: {
        ...state.projectData,
        items: state.projectData.items.filter((item) => item.id !== id),
      },
    })),
  updateItemPosition: (id, position) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, position } : item
      ),
      projectData: {
        ...state.projectData,
        items: state.projectData.items.map((item) =>
          item.id === id ? { ...item, position } : item
        ),
      },
    })),
  updateItemRotation: (id, rotation) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, rotation } : item
      ),
      projectData: {
        ...state.projectData,
        items: state.projectData.items.map((item) =>
          item.id === id ? { ...item, rotation } : item
        ),
      },
    })),
  projectData: {
    name: "My Project",
    items: [],
    createdAt: new Date().toISOString(),
  },
}));
