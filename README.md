# RandomUA

Install for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/randomua/) or [Chrome](https://chrome.google.com/webstore/detail/randomua/hjnnbhmaakbibdndnmjbkppmfjoejadg)

## What is RandomUA?
RandomUA is a WebExtension that changes your User-Agent string to a sensible-looking, desktop-browser-like UA string which is different for every request.

Many browser fingerprinting solutions use the User-Agent as a relatively constant string, because most users UAs only change when their browser updates. Therefore, having a different UA on each request make it a lot easier to evade these tracking schemes.

For example:

```
Mozilla/5.0 (Windows NT 5.64; rv:193.0) (KHTML, like Gecko)  AppleWebKit/193.0;
Mozilla/5.0 (Windows NT 7.59; rv:869.0) Gecko/20100101  Chrome/531.0 Firefox/869.0;
Mozilla/5.0 (Linux i686 on x86_64; rv:514.0) Gecko/20100101  Chrome/514.0;
Mozilla/5.0 (Windows NT 9.81; rv:77.0) Gecko/20100101  Chrome/77.0;
```

These generated UAs preserve important markers (like the Mozilla and Gecko compat markers) so that your browser isn't served unusable content, but randomizes parameters that websites really shouldn't care about (like OS version, browser version, and processor architecture) to protect your privacy.

## Permissions

RandomUA requires access to all URLs and web request data for its core function: it has to be able to change your user agent string!

## Other Platforms

Simply run the included `make_xpi.sh` script and install the generated XPI file.

## Contributing 

Contributions are welcome, either as PRs or issue reports. Please use GitHub issues for both bugs and feature requests.
