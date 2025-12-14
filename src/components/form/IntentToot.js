import {useState} from "react";
import {useForm} from "react-hook-form";
import {FormError} from "./FormError";
import {form} from "../../config/form";
import {tootDataToText} from "../../utils/helpers";

export function IntentToot({ postData }) {
    const [isTootActive, setIsTootActive] = useState(false);

    const tootText = tootDataToText(postData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const intentTootUrl = `${data.url}?text=${encodeURIComponent(tootText)}`;

        window.open(intentTootUrl, '_blank')
    }

    return (
        <div className="intent-toot">
            <button onClick={() => setIsTootActive(true)}>
                Post op Mastodon!
            </button>

            {isTootActive &&
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="url">
                            URL van jouw Mastodon instance*

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

                        <input type="submit" value="Toot!" />
                    </form>
                </>
            }
        </div>
    );
}