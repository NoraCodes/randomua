# RandomUA

RandomUA is a WebExtension that changes your User-Agent string to a sensible-looking, desktop-browser-like UA string which is different for every request.

Many browser fingerprinting solutions use the User-Agent as a relatively constant string, because most users UAs only change when their browser updates. Therefore, having a different UA on each request make it a lot easier to evade these tracking schemes.

## Permissions

RandomUA requires access to all URLs and web request data for its core function: it has to be able to change your user agent string!
