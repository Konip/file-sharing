export function audioTemplate() {
    return `<div class="preview__audio">
    <div class="preview__audio-player">
    <div class="audio-player">
    <audio src=""></audio>
        <div class="audio-player__controls">
            <div class="audio-player__playpause">
            <svg width="30px" height="30px" viewBox="0 0 30 30">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-20.000000, -35.000000)">
                            <g transform="translate(20.000000, 35.000000)">
                                <g>
                                    <circle cx="15" cy="15" r="15"></circle>
                                    <path
                                        d="M12,10.8685171 L12,19.1314829 L12,19.1314829 C12,19.6837677 12.4477153,20.1314829 13,20.1314829 C13.197425,20.1314829 13.3904327,20.0730449 13.5547002,19.9635332 L19.7519246,15.8320503 L19.7519246,15.8320503 C20.2114532,15.5256978 20.3356271,14.9048285 20.0292747,14.4452998 C19.9560398,14.3354475 19.8617768,14.2411846 19.7519246,14.1679497 L13.5547002,10.0364668 L13.5547002,10.0364668 C13.0951715,9.73011434 12.4743022,9.85428821 12.1679497,10.3138169 C12.058438,10.4780844 12,10.6710921 12,10.8685171 Z">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                </div>
        </div>
        <div class="audio-player__controls audio-player__controls--slider">
            <div class="audio-player__slider">
                <div class="audio-player__slider--background">
                    <div class="audio-player__slider--progress">
                                          <div class="audio-player__slider--pin"></div>
                    </div>
                </div>
            </div>
            <div class="audio-player__time audio-player__time--right"></div>
        </div>
    </div>
 </div>
</div>`
}

export function textTemplate() {
    return `<iframe id="viewer" frameborder="0" scrolling="no" width="300" height="200"></iframe>`
}

export function videoTemplate() {
    return `<div class="preview__video">
    <video src="" controls=""></video>
    </div>`
}

export function downloaderComplete(){
    return `
    <div class="downloader__complete"><svg class="downloader__image" viewBox="304 227 171 171">
    <g fill="#d4d7d9" fill-rule="evenodd">
        <path
            d="M449.104 251.896c33.195 33.194 33.195 87.014 0 120.208-33.194 33.195-87.014 33.195-120.208 0-33.195-33.194-33.195-87.014 0-120.208 33.194-33.195 87.014-33.195 120.208 0zm-7.07 113.137c-29.29 29.29-76.778 29.29-106.067 0-29.29-29.29-29.29-76.777 0-106.066 29.29-29.29 76.777-29.29 106.066 0 29.29 29.29 29.29 76.777 0 106.066z">
        </path>
        <path
            d="M379.686 337.237c2.716 2.672 7.186 2.25 9.353-.882l28.87-41.735c1.928-2.786 1.23-6.605-1.557-8.53-2.788-1.927-6.61-1.23-8.537 1.556l-24.688 35.694-13.687-13.395c-2.413-2.376-6.3-2.346-8.676.067-2.378 2.414-2.348 6.296.067 8.673l18.856 18.552z">
        </path>
    </g>
</svg>
<h2>Your file was uploaded successfully</h2>
</div>
`
}