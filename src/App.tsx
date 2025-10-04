import AppBar from './components/Appbar'
import MapView from './components/MapView'
import SelectionControl from './components/SelectionMode'
import DrawingContextProvider from './context_providers/drawingContextProvider'
import VegetationChart from './components/visualization/vegetationChart';

// const vegetationData = [
//   {
//     EVI: 0.24163905604042266,
//     NDVI: 0.5319657326596234,
//     NDWI: 0.1313226106667459,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 1,
//     month_name: "January",
//     year: 2023
//   },
//   {
//     EVI: 0.27718822347266886,
//     NDVI: 0.596210203261369,
//     NDWI: 0.18509420518260006,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 12,
//     month_name: "December",
//     year: 2022
//   },
//   {
//     EVI: 0.385404610702802,
//     NDVI: 0.7565778364722094,
//     NDWI: 0.2693511768749887,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 11,
//     month_name: "November",
//     year: 2022
//   },
//   {
//     EVI: 0.4425107028020209,
//     NDVI: 0.7996498966467614,
//     NDWI: 0.3215989286170226,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 10,
//     month_name: "October",
//     year: 2022
//   },
//   {
//     EVI: 0.49636705328433617,
//     NDVI: 0.7438324299494716,
//     NDWI: 0.2823034657440234,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 9,
//     month_name: "September",
//     year: 2022
//   },
//   {
//     EVI: 0.45864430408819473,
//     NDVI: 0.7081922140560403,
//     NDWI: 0.27703482225412646,
//     VegetationCategory: "Dense Vegetation / High Bloom",
//     month: 8,
//     month_name: "August",
//     year: 2022
//   }
// ];

function App() {
  return (
    <>
      <div>
        <DrawingContextProvider>
          <SelectionControl />
          <AppBar />
          <MapView />
          <div style={{ width: "90%", margin: "0 auto" }}>
            <h2>Vegetation Indices Over Time</h2>
            <VegetationChart/>
          </div>
        </DrawingContextProvider>

      </div>
    </>
  )
}

export default App
