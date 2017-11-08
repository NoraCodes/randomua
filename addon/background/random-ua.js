// Chooses one of an array of choices, entirely at random.
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

// Generates a random number between the two given values.
function randomIntBetween(min, max) {
    return Math.floor(max - Math.random() * (max - min));
}

// Generates a random version number, major version between the two given values;
function randomVersion(min, max) {
    return randomIntBetween(min, max) + "." + randomIntBetween(0, 100);
}

// A list of available operating system/architecture names.
let operating_systems = [
    "Windows NT",
    "Windows NT",
    "X11; Linux x86_64",
    "X11; Linux i686",
    "X11; Linux i686 on x86_64",
    "X11; U; Linux x86_64",
    "X11; U; Linux i686",
    "X11; U; Linux i686 on x86_64",
    "X11; FreeBSD amd64",
    "X11; FreeBSD i386",
    "X11; FreeBSD i386 on amd64",
    "X11; U; FreeBSD amd64",
    "X11; U; FreeBSD i386",
    "X11; U; FreeBSD i386 on amd64",
    "Intel Mac OS X",
    "Intel Mac OS X",
    "PPC Mac OS X",
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


function storageListener() {
    // Load local preferences
    let localPrefs;
    var gettingLocalItem = browser.storage.local.get();
    var localPrefsFuture = gettingLocalItem.then((res) => {
        localPrefs = res;
    });

    // Load sync preferences
    let syncPrefs;
    var gettingSyncItem = browser.storage.sync.get();
    var syncPrefsFuture = gettingSyncItem.then((res) => {
        syncPrefs = res;
    });

    // Preferences loaded promise combines the two other promises.
    let prefsLoadedPromise = Promise.all([localPrefsFuture, syncPrefsFuture]);

    let p = prefsLoadedPromise.then(() => {// The function to be executed prior to sending headers.
        browser.webRequest.onBeforeSendHeaders.addListener(function (request) {
            // Abort if the request is nonexistant or doesn't use headers.
            if (!request || !request.requestHeaders) {
                return {};
            }

            // If there are no exclusions, nothing is excluded.
            if (syncPrefs.exclusions !== undefined) {
                // If there are exclusions, loop over them, checking if the URL matches.
                for (const exclude of syncPrefs.exclusions.split(";")) {
                    if (request.url.includes(exclude.trim()) && exclude.trim() !== "") {
                        // If the URL matches, abort.
                        console.log("[RANDOMUA] excluding url " + request.url + " based on exclude " + exclude);
                        return {};
                    }
                }
            }

            // Find the header called "User-Agent" or "user-agent" or "UsEr-AgEnT" or whatever, and modify it
            let correctHeader = "";
            for (let header of request.requestHeaders) {
                if (header.name.toLowerCase() === "user-agent") {
                    correctHeader = header;
                }
            }

            // Possible mobile inclusion
            let mo = "";
            if (localPrefs.useMobile) {
                mo = " Mobile ";
            }
            // Compute a random OS string.
            let os = get_os();

            // Compute random browser version syncronization
            let min = 0;
            let max = 250;
            if (syncPrefs.minVersion !== undefined) {
                min = syncPrefs.minVersion;
            }
            if (syncPrefs.maxVersion !== undefined) {
                max = syncPrefs.maxVersion;
            }
            // Main browser clause version
            let fv = "" + randomVersion(min, max);
            // Second browser clause
            let bc = " " + choose(browsers) + "/" + randomVersion(min, max);

            // Choose from the list of browsers.
            let br = choose(browsers);
            // Choose additional clause.
            let kh = choose(khtml);
            bc = choose([bc, ""]);
            correctHeader.value = "Mozilla/5.0 (" + os + "; rv:" + fv + ")" + kh + bc + mo + " " + br + "/" + fv + ";"
            console.log("[RANDOMUA] Fake User-Agent set: ", correctHeader.value);
            return { requestHeaders: request.requestHeaders };
        }, { urls: ['<all_urls>'] }, ['blocking', 'requestHeaders']);


    });

}


browser.storage.onChanged.addListener(storageListener);
storageListener();
