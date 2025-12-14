import {useForm} from "react-hook-form";
import {form} from "../config/form";
import {FormError} from "./form/FormError";
import {FormLocationPicker} from "./form/FormLocationPicker";
import {useState} from "react";
import {PostPreview} from "./form/PostPreview";

export function PostCreateForm() {
    const [showResult, setShowResult] = useState(false)
    const [postData, setPostData] = useState({})

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setShowResult(true)
        setPostData(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <label htmlFor="title">
                    Titel*

                    <FormError
                        errors={errors}
                        name="title"
                    />
                </label>
                <input id="title" type="text" {...register("title",
                    {
                        required: form.error.message.required,
                    }
                )}
                />

                <label htmlFor="msg">
                    Bericht

                    <FormError
                        errors={errors}
                        name="msg"
                    />
                </label>
                <textarea id="msg" {...register("msg")} />

                <FormLocationPicker
                    errors={errors}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                />

                <input type="submit" value="Bericht genereren" />
            </form>

            {showResult && (
                    <>
                        <h3>Resultaat</h3>

                        <p>Post het onderstaande bericht op Mastodon om uw bericht op de kaart te tonen.</p>

                        <PostPreview
                            postData={postData}
                        />
                    </>
                )
            }
        </>
    )
}
