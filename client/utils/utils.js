export function convertSize(size) {
    return size > 1048576 ? `${(size / 1048576).toFixed(2)} MB` : `${size} Bytes`
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function changeSVG(play) {

    let svg = document.querySelector('.audio-player__playpause svg path')

    if (play) {
        svg.setAttribute('d', "M12,10.8685171 L12,19.1314829 L12,19.1314829 C12,19.6837677 12.4477153,20.1314829 13,20.1314829 C13.197425,20.1314829 13.3904327,20.0730449 13.5547002,19.9635332 L19.7519246,15.8320503 L19.7519246,15.8320503 C20.2114532,15.5256978 20.3356271,14.9048285 20.0292747,14.4452998 C19.9560398,14.3354475 19.8617768,14.2411846 19.7519246,14.1679497 L13.5547002,10.0364668 L13.5547002,10.0364668 C13.0951715,9.73011434 12.4743022,9.85428821 12.1679497,10.3138169 C12.058438,10.4780844 12,10.6710921 12,10.8685171 Z")
    } else {
        svg.setAttribute('d', "M10 10.496C10 9.67 10.666 9 11.5 9c.828 0 1.5.68 1.5 1.496v9.008C13 20.33 12.334 21 11.5 21c-.828 0-1.5-.68-1.5-1.496v-9.008zm7 0C17 9.67 17.666 9 18.5 9c.828 0 1.5.68 1.5 1.496v9.008C20 20.33 19.334 21 18.5 21c-.828 0-1.5-.68-1.5-1.496v-9.008z")
    }
}

export function formatTime(time) {
    let sec_num = parseInt(time, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    
    return hours > 0
        ? hours + ':' + minutes + ':' + seconds
        : minutes + ':' + seconds;
}