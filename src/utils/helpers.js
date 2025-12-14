export const tootDataToText = ({handle, msg, lat, lon, title}) => {
    return `${handle} ${msg}\n\n[lat=${lat} lon=${lon} title=${encodeURIComponent(title)}]`
}

// replaces placeholders api/v1/accounts/%id%/statuses -> with { id: 0 } -> api/v1/accounts/0/statuses
export const fillPlaceholders = (text, dataObject) => {
    let replacedText = text;

    for (const [key, value] of Object.entries(dataObject)) {
        replacedText = replacedText.replace(`%${key}%`, value)
    }

    return replacedText;
}