function init(){
    window.addEventListener('DOMContentLoaded',
        () => {
            // Inject extension URL into local var space
            let extURL = chrome.runtime.getURL("");
            let script = "window.extURL = '" + extURL + "';" +
                "window.wft = {};" +
                "window.wft.options = {};";
            let inlineScriptElem = document.createElement("script");
            inlineScriptElem.innerText = script;
            document.getElementsByTagName('body')[0].appendChild(inlineScriptElem);

            // Add file patcher
            let patcherScriptElem = document.createElement('script');
            patcherScriptElem.src = chrome.runtime.getURL("hackFiles/patcher.js");
            document.getElementsByTagName('head')[0].appendChild(patcherScriptElem);

            // Add wayfarer bootstrap
            let bootstrapScriptElem = document.createElement('script');
            bootstrapScriptElem.src = chrome.runtime.getURL("hackFiles/bootstrap.js");
            document.getElementsByTagName('head')[0].appendChild(bootstrapScriptElem);

            console.log("[WayFarer Toolkit] Base setup complete.");
        }
    )
}

init();