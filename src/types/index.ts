// src/types/index.ts

// Define ElementType
export type ElementType = "table" | "window" | "door" | "separator";
// Define TableType (This seems to be distinct from ElementType)
export type TableType = "type-1" | "type-2" | "type-3"; // Consider if this should be part of ElementData table specific properties

// Define CanvasConfig
export interface CanvasConfig {
  restaurantId: string;
  aspectRatio: string;
  width: number;
  height: number;
  // Removed restaurantId and areaId from CanvasConfig based on the error analysis
  // If needed as part of a different config object, define it elsewhere.
}

// Define Position
export interface Position {
  x: number;
  y: number;
}

// Define ElementData - Added more specific table properties as suggested by existing usage
export interface ElementData {
  id: string;
  type: ElementType | string; // Allow string for flexibility if needed, but ElementType is preferred
  position: Position;
  rotation: number;
  // Common properties for all elements (optional as not all types will use them)
  width?: number;
  height?: number;
  color?: string;
  label?: string; // Could be used for any element type
  shape?: string;

  // Table specific properties (optional)
  tableStatus?: "available" | "occupied" | "reserved" | string; // Allow string for flexibility
  tableNumber?: number;
  tableLabel?: string; // Could be an alternative to label for tables
  tableType?: "round" | "square" | "rectangular" | "oval" | string; // Allow string for flexibility
  capacity?: number; // Added capacity for tables
  customerId?: string; // Added customerId for occupied tables
}

// Define CanvasState - Added restaurantId and areaId here
export interface CanvasState {
  elements: ElementData[];
  selectedElement: string | null;
  canvasConfig: CanvasConfig;
  restaurantId: string; // Added restaurantId to CanvasState
  areaId: string; // Added areaId to CanvasState
}

// Define CanvasAction - Updated SET_CANVAS_CONFIG payload if needed, but keep it simple for now
export type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | {
      type: "SET_CANVAS_CONFIG";
      payload: CanvasConfig; // Payload directly uses CanvasConfig
    };

// Define Table
export interface Table {
  id: string;
  number: number;
  capacity: number;
  // Add positioning/layout information later for the canvas view if needed here,
  // but ElementData already contains position and size for canvas rendering.
  // Keep this Table type focused on the data structure for restaurant/area management.
}

// Define Area - Ensured 'tables' property is present
export interface Area {
  id: string;
  name: string;
  tables?: Table[];
}

// Define Restaurant - Ensured 'areas' property with Area type is present
export interface Restaurant {
  id: string;
  name: string;
  areas: Area[];
}

// Example initial data (optional, but good for testing)
export const initialRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Green Spoon",
    areas: [
      { id: "a1", name: "Main Dining", tables: [] }, // Ensure tables array is present
      { id: "a2", name: "Outdoor Patio", tables: [] }, // Ensure tables array is present
    ],
  },
  {
    id: "2",
    name: "Pizza Haven",
    areas: [{ id: "a3", name: "Indoor Seating", tables: [] }], // Ensure tables array is present
  },
];
