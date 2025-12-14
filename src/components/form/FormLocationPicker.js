import {OpenStreetMap} from "../map/OpenStreetMap";
import {Marker} from "react-leaflet";
import {useEffect, useState} from "react";
import {FormError} from "./FormError";
import {map} from "../../config/map";
import {form} from "../../config/form";

export function FormLocationPicker({latInputName="lat", lonInputName="lon", errors, register, watch, setValue}) {
    const [pinPosition, setPinPosition] = useState(map.initial.position)

    const [lat, lon] = watch([latInputName, lonInputName])

    useEffect(() => {
        if (!lat || !lon) return;

        setPinPosition([lat, lon]);
    }, [lat, lon])

    return (
        <>
            <p>Versleep de pin op de kaart of voer handmatig de coördinaten in.</p>

            <OpenStreetMap>
                <Marker
                    position={pinPosition}
                    draggable
                    autoPan
                    eventHandlers={{
                        moveend: (event) => {
                            setValue(latInputName, Math.trunc(event.target.getLatLng().lat * 1000) / 1000)
                            setValue(lonInputName, Math.trunc(event.target.getLatLng().lng * 1000) / 1000)
                        }
                    }}
                />
            </OpenStreetMap>

            <label htmlFor="lat">
                Breedtegraad*

                <FormError
                    errors={errors}
                    name={latInputName}
                />
            </label>
            <input id="lat" type="number" step="0.001"
                {...register(latInputName,
                    {
                        required: form.error.message.required,
                        value: pinPosition[0]
                    }
                )}
            />

            <label htmlFor="lon">
                Lengtegraad*

                <FormError
                    errors={errors}
                    name={lonInputName}
                />
            </label>
            <input id="lon" type="number" step="0.001"
                {...register(lonInputName,
                    {
                        required: form.error.message.required,
                        value: pinPosition[1]
                    }
                )}
            />
        </>
    )

}