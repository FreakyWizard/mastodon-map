import {Marker, Popup} from "react-leaflet";

export function MapMarker({position, children}) {
    return (
        <Marker position={position}>
            <Popup>
                { children }
            </Popup>
        </Marker>
    )
}