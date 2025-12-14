import {fillPlaceholders} from "../helpers";
import {StatusData} from "./data/StatusData";

export class MastodonFeedApi {
    #searchEndpoint = '/api/v2/search?q=%text%'
    #statuses = '/api/v1/accounts/%id%/statuses?limit=20'

    #instanceBaseUri;
    #mapBotAccountHandle;

    constructor(mapBotAccountHandle, instanceBaseUri) {
        this.#mapBotAccountHandle = mapBotAccountHandle;
        this.#instanceBaseUri = instanceBaseUri;
    }

    #generateEndpointUri(endpoint, data) {
        if (! this.#instanceBaseUri) return;

        const populatedEndpoint = fillPlaceholders(endpoint, data);

        return this.#instanceBaseUri + populatedEndpoint;
    }

    async #getAccountId() {
        const url = this.#generateEndpointUri(this.#searchEndpoint, {
            text: this.#mapBotAccountHandle
        })

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch Mastodon account ID, status: ${response.status}`);
            }

            const result = await response.json();

            return result?.accounts[0]['id'] ?? -1;
        } catch (error) {
            console.error(error.message);
        }
    }

    async getStatuses() {
        const id = await this.#getAccountId();

        if (id < 0) return;

        const url = this.#generateEndpointUri(this.#statuses, {
            id: id
        })

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch Mastodon account ID, status: ${response.status}`);
            }

            const result = await response.json();

            return result.map((post) =>  {
                let data = post;

                // if reblog, change data source
                if (post?.reblog) data = post.reblog;

                return new StatusData(data?.url, data?.content);
            })
        } catch (error) {
            console.error(error.message);
        }
    }
}