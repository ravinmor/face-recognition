export default {
    toSnakeCase(text) {
        const newText = text.toLowerCase().replace(/\s+/g, '_');
        return newText;
    }
}