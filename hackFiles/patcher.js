function applyJSONTextPatch(sourceText, jsonPatch){
    function insertIntoString(srcString, pos, value){
        return srcString.slice(0, pos) + value + srcString.slice(pos);
    }
    for (let i = 0; i < jsonPatch.length; i++){
        let patchRule = jsonPatch[i];
        sourceText = insertIntoString(sourceText, patchRule.pos, patchRule.content);
    }
    if (window.wft.options.DEBUG !== undefined){
        console.log(jsonPatch);
        // Log patched sourceText
        console.log(sourceText);
    }
    return sourceText;
}

async function loadPatchedRemoteFile(remoteSrc, patchFile){
    const response = await fetch(extURL + "patches/" + patchFile);
    const jsonPatch = await response.json();

    fetch(remoteSrc)
    .then(data => data.text())
    .then(
        function scriptBodyPatch(text){
            let patchedSrc = applyJSONTextPatch(text, jsonPatch);
            let patchedScriptElem = document.createElement("script");
            patchedScriptElem.innerText = patchedSrc;
            document.getElementsByTagName("body")[0].appendChild(patchedScriptElem);
            console.log("[WayFarer-] Injected patched version of " + remoteSrc);
        }
    );
}