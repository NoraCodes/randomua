// Save the contents of the preferences form
function saveOptions(e) {
    browser.storage.sync.set({
        exclusions: document.querySelector("#exclusions").value,
        minVersion: document.querySelector("#minVersion").value,
        maxVersion: document.querySelector("#maxVersion").value,
    });
    browser.storage.local.set({
        useMobile: document.querySelector('#use-mobile').checked
    })
    e.preventDefault();

    // Show the newly selected options
    restoreOptions();
}

// Show currently selected options
function restoreOptions() {
    var gettingItem = browser.storage.sync.get();
    gettingItem.then((res) => {
        document.querySelector("#exclusions-text").innerText = res.exclusions || 'no exclusions configured';
        document.querySelector("#exclusions").value = res.exclusions || '';
        document.querySelector("#minVersion").value = res.minVersion || 0;
        document.querySelector("#maxVersion").value = res.maxVersion || 250;
    });

    var gettingLocalItem = browser.storage.local.get('useMobile');
    gettingLocalItem.then((res) => {
        document.querySelector('#use-mobile').checked = res.useMobile;
    })
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);