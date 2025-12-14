import {StatusData} from "./data/StatusData";

export class PostMeta {
    #statusData;

    #metadata

    constructor(statusData) {
        this.#statusData = statusData ?? new StatusData();
        this.#parseMetaData();
    }

    isValidMeta() {
        return this.#metadata && this.#metadata !== {};
    }

    #getMetaString() {
        const res = this.#statusData.content.match(/(?<=\[)[^\][]*(?=])/g);

        if (!res || res?.length < 0) return '';

        return res[0];
    }

    #parseMetaData() {
        const metaString = this.#getMetaString();

        if (!metaString) return;

        const dataEntries = metaString.split(' ');

        this.#metadata = {};

        dataEntries.forEach((dataEntry) => {
            const keyval = dataEntry.split('=');

            this.#metadata[keyval[0]] = keyval[1];
        })
    }

    getLat() {
        return parseFloat(this.#metadata?.lat);
    }

    getLon() {
        return parseFloat(this.#metadata?.lon);
    }

    getTitle() {
        return decodeURI(this.#metadata?.title);
    }
}