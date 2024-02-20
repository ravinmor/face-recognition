export default {
    toSnakeCase(text) {
        return text.toLowerCase().replace(/\s+/g, '_');
    }
}