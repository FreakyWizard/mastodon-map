import {OpenStreetMap} from "./map/OpenStreetMap";
import {FormError} from "./form/FormError";
import {form} from "../config/form";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {MastodonFeedApi} from "../utils/Mastodon/MastodonFeedApi";
import {ResultMapMarker} from "./map/ResultMapMarker";

export function PostsMap() {
    const [mapAccountHandle, setMapAccountHandle] = useState()
    const [mapInstanceUrl, setMapInstanceUrl] = useState()
    const [markers, setMarkers] = useState([])
    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setMapAccountHandle(data.handle);
        setMapInstanceUrl(data.url)
    }
    
    useEffect(() => {
        const mastodonApi = new MastodonFeedApi(mapAccountHandle, mapInstanceUrl);

        mastodonApi.getStatuses().then((data) => markersPopulate(data))
    }, [mapAccountHandle, mapInstanceUrl])

    const markersPopulate = (markerData) => {
        setMarkers(markerData?.map(
            (pinData) => {
                return (
                    <ResultMapMarker
                        markerData={pinData}
                    />
                )
            }))
    }

    return (
        <div className="post-map">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="handle">
                    URL Mastodon instance van kaart account*

                    <FormError
                        errors={errors}
                        name="url"
                    />
                </label>
                <input id="url" type="text" {...register("url",
                    {
                        required: form.error.message.required,
                        pattern: {
                            value: form.data.url.regex,
                            message: form.error.message.url
                        }
                    }
                )}
                />

                <label htmlFor="handle">
                    Mastodon kaart account handle*

                    <FormError
                        errors={errors}
                        name="handle"
                    />
                </label>
                <input id="handle" type="text" {...register("handle",
                    {
                        required: form.error.message.required,
                        pattern: {
                            value: form.data.mastodon.handleRegex,
                            message: form.error.message.handle
                        }
                    }
                )}
                />

                <input type="submit" value="Kaart laden" />
            </form>

            {mapAccountHandle && mapInstanceUrl &&
                <OpenStreetMap>
                    {markers}
                </OpenStreetMap>
            }
        </div>
    );
}