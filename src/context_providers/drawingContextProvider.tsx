import { useState, type ReactNode } from "react";
import { DrawingContext, type VegetationData } from "./drawingContext";
import type { LatLng } from "leaflet";
import fetchVegetationCoverData from "../api/networkcalls";

const DrawingContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDrawModeActive, setDrawMode] = useState(false);
    let geofenceData: Array<[number, number]> = [];
    const [vegetationData, setVegetationData] = useState<VegetationData[]>();


    function convertToArray(coords: Array<LatLng>): Array<[number, number]> {
        return coords.map(c => [c.lng, c.lat]);
    }

    function sendDrawData(data: Array<LatLng>) {
        geofenceData = convertToArray(data);
    }

    function fetchVegetationData() {
        fetchVegetationCoverData(geofenceData).then((response) => {
            setVegetationData(response)
        });
    }

    return (
        <DrawingContext.Provider value={{ isDrawModeActive, setDrawMode, sendDrawData, fetchVegetationData,vegetationData}}>
            {children}
        </DrawingContext.Provider>
    );
};

export default DrawingContextProvider;