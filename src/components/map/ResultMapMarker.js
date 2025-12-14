import {MapMarker} from "./MapMarker";
import {PostMeta} from "../../utils/Mastodon/PostMeta";
import parse from 'html-react-parser';

export const ResultMapMarker = ({markerData}) => {
    const postMeta = new PostMeta(markerData);

    if (!postMeta.isValidMeta()) return;

    return (
        <MapMarker
            position={[postMeta.getLat(), postMeta.getLon()]}
        >
            <h4>{postMeta.getTitle()}</h4>

            {parse(markerData.getMsg() ?? '')}
        </MapMarker>
    )
}