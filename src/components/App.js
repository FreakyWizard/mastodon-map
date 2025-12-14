import {PostCreateForm} from "./PostCreateForm";
import {PostsMap} from "./PostsMap";
import {useState} from "react";

export function App() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="page">
            <h1>Mastodon Map</h1>

            <p>Een simpel prototype dat Mastodon posts op een LeafletJS kaart toont. Maak een posts aan met de tool hieronder, post hem op Mastodon en zie hem daarna verschijnen op de kaart!</p>

            <h2>Post maken tool</h2>

            <button onClick={() => setShowForm(!showForm)}>Maak een post</button>

            {showForm && (<>
                <p>Velden met een <strong>*</strong> zijn verplicht.</p>

                <PostCreateForm />
            </>)}

            <h2>View posts on map</h2>

            <PostsMap />
        </div>
    );
}