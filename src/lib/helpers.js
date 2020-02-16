export function stripHTMLTags(string) {
    return string.replace(/(<([^>]+)>)/ig, "");
}