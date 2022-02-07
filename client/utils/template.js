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

export function videoTemplate() {
    return `<div class="preview__video">
    <video src="" controls=""></video>
    </div>`
}

export function downloaderCompleteTemplate() {
    return `<div class="transfer__contents">
        <div class="downloader__complete">
            <svg class="downloader__image" viewBox="304 227 171 171">
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
    </div>`
}

export function tooltip(text) {
    return `<div class="transfer__tooltip">
        <p>${text}</p>
    </div>`
}

export function transfer__bodyTemplate(name, size) {
    return `<div class="transfer__body">
   <div class="transfer__contents">
       <svg class="downloader__top-icon" viewBox="0 0 170 170">
           <g fill="#d4d7d9" fill-rule="evenodd">
               <path d="M145.104 24.896c33.195 33.194 33.195 87.014 0 120.208-33.194 33.195-87.014 33.195-120.208 0C-8.3 111.91-8.3 58.09 24.896 24.896 58.09-8.3 111.91-8.3 145.104 24.896zm-7.071 7.071c-29.29-29.29-76.777-29.29-106.066 0-29.29 29.29-29.29 76.777 0 106.066 29.29 29.29 76.777 29.29 106.066 0 29.29-29.29 29.29-76.777 0-106.066z">
               </path>
               <path d="M82 100.843V59.007A4.006 4.006 0 0 1 86 55c2.21 0 4 1.794 4 4.007v41.777l15.956-15.956a4.003 4.003 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.657l-22.628 22.628a3.99 3.99 0 0 1-3.017 1.166 3.992 3.992 0 0 1-3.012-1.166L60.328 90.485a4.003 4.003 0 0 1 0-5.657 4.004 4.004 0 0 1 5.657 0L82 100.843z">
               </path>
           </g>
       </svg>
       <h2>Ready when you are</h2>
       <div class="file-system-entry">
           <h6 class="file-system-entry__title">${name}</h6>
           <div class="file-system-entry__details">
               <span class="file-system-entry__size">${size}</span>
               <span class="file-system-entry__format">png</span>
           </div>
           <div class="file-system-entry__actions">
               <div class="filelist__action">
                   <svg width="24" height="24">
                       <path fill="current" d="M15.31 13.8957l1.397 1.3972c.3906.39.3906 1.0232 0 1.414-.3904.3902-1.0236.3902-1.414 0l-1.3973-1.397c-.6937.437-1.5152.69-2.3957.69C9.0147 16 7 13.985 7 11.5S9.0147 7 11.5 7 16 9.0147 16 11.5c0 .8805-.253 1.702-.69 2.3957zM0 12C0 5.3726 5.3726 0 12 0s12 5.3726 12 12-5.3726 12-12 12S0 18.6274 0 12zm22 0c0-5.5228-4.4772-10-10-10S2 6.4772 2 12s4.4772 10 10 10 10-4.4772 10-10zm-10.5 2c1.3807 0 2.5-1.1193 2.5-2.5S12.8807 9 11.5 9 9 10.1193 9 11.5s1.1193 2.5 2.5 2.5z">
                       </path>
                   </svg>
               </div>
           </div>
       </div>
   </div>
</div>`
}