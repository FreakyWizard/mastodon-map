export const form = {
    error: {
        message: {
            handle: 'De opgeven user handle heeft niet de juiste opmaak @username@domain.tdl',
            required: 'Dit veld is verplicht',
            url: "Voer een geldige URL in"
        }
    },
    data: {
        mastodon: {
            handleRegex: /^@[^@]+@[^@]+\.[^@]+$/i
        },
        url: {
            regex: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,256}$/i
        }
    }
}