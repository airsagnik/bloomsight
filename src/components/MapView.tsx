import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import classes from './MapView.module.css';
import { Marker, Polygon } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import React, { useContext, useState } from 'react';
import { DrawingContext } from '../context_providers/drawingContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

interface LocationMarkersProps {
  index: number; // the number parameter
}


const LocationMarkers: React.FC<LocationMarkersProps> = ({ index }) => {
    const initialMarkers: LatLng[] = [];
    const [markers, setMarkers] = useState(initialMarkers);
    const sendDrawData = useContext(DrawingContext)?.sendDrawData;
    const data = useContext(DrawingContext)?.vegetationData || [];
   
    const currentData = data[index];

    const getColor = (ndvi: number) => {
        if (ndvi > 0.7) return "darkgreen";
        if (ndvi > 0.5) return "green";
        return "lightgreen";
    };

    const map = useMapEvents({
        click(e) {
            setMarkers((prevValue) => [...prevValue, e.latlng]);
            sendDrawData?.(markers);
        }
    });

    return (
        <React.Fragment>
            {markers.map(marker => <Marker position={marker} ></Marker>)}
            {data.length > 0 && currentData && markers.length > 2 ?
                <Polygon
                    pathOptions={{
                        color: getColor(currentData.NDVI),
                        fillColor: getColor(currentData.NDVI),
                        fillOpacity: 0.5,
                    }}
                    positions={markers}
                /> : <div></div>}
        </React.Fragment>
    );
}



function MapView() {
    const isDrawEnabled = useContext(DrawingContext)
    const [activeIndex, setActiveIndex] = useState(0);
    const data = useContext(DrawingContext)?.vegetationData || [];
   
    return (<div>
        <div className={classes.mapHolder}>
            <MapContainer
                center={[23.5204, 87.3119]}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {isDrawEnabled?.isDrawModeActive &&
                    <LocationMarkers index={activeIndex} />}
            </MapContainer>
        </div>;
        {/* Carousel Overlay */}
        <div style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "30%",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "12px",
            padding: "0px",
            zIndex : "1000",
        }}>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {data.map((d, idx) => (
                    <SwiperSlide key={idx}>
                        <div style={{ textAlign: "center" }}>
                            <h3>{d.month_name} {d.year}</h3>
                            <p><b>NDVI:</b> {d.NDVI.toFixed(2)}</p>
                            <p><b>EVI:</b> {d.EVI.toFixed(2)}</p>
                            <p><b>NDWI:</b> {d.NDWI.toFixed(2)}</p>
                            <p><b>Category:</b> {d.VegetationCategory}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>);

}

export default MapView;