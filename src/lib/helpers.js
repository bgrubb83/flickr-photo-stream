export function stripHTMLTags(string) {
    return string.replace(/(<([^>]+)>)/ig, '');
}

export function stripNonAlphaNumericsAndWhiteSpace(string) {
    console.log(string);
    console.log(typeof string);
    /* Strip out all characters which aren't alphanumeric or whitespace
    a-zA-Z =  matches all the letters
    \d = numeric
    \s = whitespace
    ^ = negates them all */
    return string.replace(/[^a-zA-Z\d\s]/, ' ');
}