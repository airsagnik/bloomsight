import type { VegetationData } from "../context_providers/drawingContext";

const API_URL = "https://vegetation-api.vercel.app/get_last4months";

// Polygon coordinates (longitude, latitude)
const polygonCoords = [
    [87.4159129525256, 23.531707307249885],
    [87.41368075904246, 23.522893402178255],
    [87.40251979162684, 23.5206898336807],
    [87.39187394578424, 23.526670862348702],
    [87.38483395095284, 23.523837777384745],
    [87.38689443724493, 23.509671437947073],
    [87.3985705262336, 23.509671437947073],
    [87.41265051589644, 23.509671437947073],
    [87.42535684803113, 23.512032600361778],
    [87.43274025724456, 23.510615907992626],
    [87.44184073836807, 23.51093072983607],
    [87.4159129525256, 23.531707307249885] // Close the polygon
];

const polygonPayload = {
    type: "Polygon",
    coordinates: [polygonCoords]
};

const pointPayload = {
    type: "Point",
    coordinates: [87.3119, 23.5204] // Longitude, Latitude
};

function toClosedPolygon(coords: Array<[number, number]>): Array<[number, number]> {
    const first = coords[0];
    const last = coords[coords.length - 1];

    if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push(first);
    }

    return coords;
}

async function fetchVegetationCoverData(coordinates: Array<[number, number]>) : Promise<VegetationData[] | undefined> {
    try {
        let payload;
        if (coordinates && coordinates.length > 2) {
            polygonPayload.coordinates = [toClosedPolygon(coordinates)];
            payload = polygonPayload;
        }
        else {
            pointPayload.coordinates = coordinates[0];
            payload = pointPayload;
        }
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Server error:", response.status, await response.text());
            return;
        }

        const data = await response.json();
        console.log("Vegetation data:", data);
        return data;
    } catch (error) {
        console.error("Request failed:", error);
    }
}

export default fetchVegetationCoverData;

