import sanitize
    from "sanitize-html";
export const san = (text) => {
    sanitize(text, {
        allowedTags: [],
        allowedAttributes: {},
    })
}

export const dSan = (input) => {
    if (typeof input === "string") {
        return san(input);
    }

    if (Array.isArray(input)) {
        return input.map(san);
    }

    if (typeof input === "object" && input !== null) {
        const sanitized = {};
        for (const key in input) {
            sanitized[key] = san(input[key]);
        }
        return sanitized;
    }
}