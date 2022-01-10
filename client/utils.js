export function convertSize(size) {
    return size > 1048576 ? `${(size / 1048576).toFixed(2)} MB` : `${size} Bytes`
}
