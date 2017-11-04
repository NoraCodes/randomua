function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

let operating_systems = [
    "Windows NT",
    "X11; Linux x86_64",
    "Linux i686",
    "Linux i686 on x86_64",
    "Intel Mac OS X",
    "PPC Mac OS X"
];
// Get an operating system name and version.
function get_os() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 100);
    let choice = choose(operating_systems);
    // Linux doesn't use version numbers.
    if (!choice.includes("Linux")) {
        choice += " " + x + "." + y
    }
    return choice;
}

// List of simple browsers to apply
let browsers = ["Firefox", "Chrome", "Safari", "Trident", "OPR", "AppleWebKit"];

// Either add a KHTML clause, or don't.
let khtml = [" (KHTML, like Gecko) ", " Gecko/20100101 "];


browser.webRequest.onBeforeSendHeaders.addListener(function (request) {
    // Abort if the request is nonexistant or doesn't use headers.
    if (!request || !request.requestHeaders) {
        return {};
    }

    // Only apply the header modification if not excluded
    let excluded = false;
    var gettingItem = browser.storage.sync.get('exclusions');
    gettingItem.then((res) => {
        for (const exclude of res.exclusions) {
            if (request.url.includes(exclude) && exclude !== "") {
                excluded = true;
                console.log("[RANDOMUA] excluding url " + request.url + " based on exclude " + exclude);
            }
        }
    });

    // If possible, apply the header modification
    if (!excluded) {
        // Find the header called "User-Agent" or "user-agent" or "UsEr-AgEnT" or whatever, and modify it
        for (let header of request.requestHeaders) {
            if (header.name.toLowerCase() === "user-agent") {
                // Compute a random OS string.
                let os = get_os();
                // Compute a random Firefox version, from 50 to 950.
                let fv = "" + (Math.floor(Math.random() * 900) + 50) + ".0";
                // Choose from the list of browsers.
                let br = choose(browsers);
                // Choose additional clause, if any
                let kh = choose(khtml);
                // Generate a possible second browser clause
                let bc = " " + choose(browsers) + "/" + Math.floor(Math.random() * 1000) + ".0";
                bc = choose([bc, ""]);
                header.value = "Mozilla/5.0 (" + os + "; rv:" + fv + ")" + kh + bc + " " + br + "/" + fv + ";"
                console.log("[RANDOMUA] Fake User-Agent set: ", header.value);
            }
        }
    }
    return { requestHeaders: request.requestHeaders };

}, { urls: ['<all_urls>'] }, ['blocking', 'requestHeaders']);