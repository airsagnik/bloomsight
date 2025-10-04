import type { LatLng } from "leaflet";
import {createContext} from "react";
export interface DrawingContextType {
    isDrawModeActive: boolean;
    setDrawMode: (value: boolean) => void;
    sendDrawData?: (data: Array<LatLng>) => void;
    fetchVegetationData: () => void;
    vegetationData?: VegetationData[];
} 
export interface VegetationData {
  EVI: number;
  NDVI: number;
  NDWI: number;
  VegetationCategory: string;
  month: number;
  month_name: string;
  year: number;
}


export const DrawingContext =  createContext<DrawingContextType | undefined>(undefined);;
