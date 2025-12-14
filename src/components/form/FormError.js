import {ErrorMessage} from "@hookform/error-message";

export function FormError({errors, name}) {
    return (
        <ErrorMessage
            errors={errors}
            name={name}
            as="span"
        />
    )
}