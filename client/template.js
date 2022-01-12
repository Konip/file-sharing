export function audioTemplate(src){
    return `<div class="preview__audio-player">
    <div class="audio-player"><audio preload="metadata"
            src="${src}"></audio>
        <div class="audio-player__controls">
            <div class="audio-player__playpause"><svg width="30px" height="30px" viewBox="0 0 30 30">
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
                </svg></div>
        </div>
        <div class="audio-player__controls audio-player__controls--slider">
            <div class="audio-player__slider">
                <div class="audio-player__slider--background">
                    <div class="audio-player__slider--buffer" style="width: 1.89826%;"></div>
                    <div class="audio-player__slider--progress">
                        <div class="audio-player__slider--pin"></div>
                    </div>
                </div>
            </div>
            <div class="audio-player__time audio-player__time--right">3:05 </div>
        </div>
    </div>
</div>`
}

