chrome.webRequest.onBeforeRequest.addListener(
    info => {
        // For debugging
        console.log(info.url);
        // First narrow down to only looking at script requests to wayfarer.nianticlabs.com
        if (info.type === "script"){
            // Check if URL contains keywords of scripts we need to prevent from loading
            let blockingRegExp = new RegExp("runtime|main|WFToolkitIntercept");
            if (blockingRegExp.test(info.url)) {
                // Block the request!
                console.log("BLOCKED!", info.url);
                return {cancel: true};
            }
        }
    },
    {
        urls: [
            '*://wayfarer.nianticlabs.com/*'
        ],
    },
    ['blocking']
);