// Save the contents of the text box based on the #exclusions text entry box
function saveOptions(e) {
    browser.storage.sync.set({
        exclusions: document.querySelector("#exclusions").value
    });
    e.preventDefault();

    // Show the newly selected options
    restoreOptions();
}

// Show currently selected options
function restoreOptions() {
    var gettingItem = browser.storage.sync.get('exclusions');
    gettingItem.then((res) => {
        document.querySelector("#exclusions-text").innerHTML = res.exclusions || 'no exclusions configured';
        document.querySelector("#exclusions").value = res.exclusions || '';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);