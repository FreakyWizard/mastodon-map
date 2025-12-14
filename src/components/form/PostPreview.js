import {tootDataToText} from "../../utils/helpers";
import {IntentToot} from "./IntentToot";

export function PostPreview({ postData }) {
    return (
        <>
            <pre className="result">
                {tootDataToText(postData)}
            </pre>

            <IntentToot
                postData={postData}
            />
        </>




    );
}