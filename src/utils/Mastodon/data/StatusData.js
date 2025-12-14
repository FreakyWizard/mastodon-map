export class StatusData {
    url;
    content;

    constructor(url, content) {
        this.url = url;
        this.content = content;
    }

    getMsg() {
        return this.content.replace(/(<\/?(?:p)[^>]*>)|<[^>]+>/ig, '').replace(/@([A-Za-z0-9]+(_[A-Za-z0-9]+)+)/i, '').replace(/\[[^\]]*\]/i, '');
    }
}