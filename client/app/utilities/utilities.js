/**
 * Calculate top position of an element relative to the document
 * @param {HTMLElement} elem - Target element
 * @param {String} stopNodeName - Node name to stop at (if not supplied, calculation goes all the way to the top level parent)
 * @return {Number} - Top position of the element relative to the document
 */
function getOffsetTop(elem, stopNodeName) {
    let offsetTop = 0;

    let traverseParents = elem => {
        if (
            !elem.offsetParent ||
            (elem.nodeName === stopNodeName || elem.id === stopNodeName)
        ) {
            return;
        }

        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }

        traverseParents(elem.offsetParent);
    };

    // Initiate the recursive calls
    traverseParents(elem);

    return offsetTop;
}

/**
 * Rounds a number to the nearest integer with supplied precision
 * @param {Number} number
 * @param {Number} precision
 * @return {Number}
 */
function precisionRound(number, precision) {
    let factor = Math.pow(10, precision);

    return Math.round(number * factor) / factor;
}

/**
 * Parse a query string into an object
 * @param {string} queryString Query string to parse
 * @return {Object}
 */
function parseQueryString(queryString) {
    if (!queryString) return;

    let params = {};

    // Remove preceding '?' if it exists
    if (queryString.charAt(0) === '?') queryString = queryString.slice(1);

    // Split each parameter separated by '&'
    queryString.split('&').forEach(paramString => {
        let splitParam = paramString.split('=');

        // Store parameter
        params[splitParam[0].toLocaleLowerCase()] = splitParam[1];
    });

    return params;
}

/**
 * Scroll the window to bring target element into view
 * @param {HTMLElement} target - Target element
 * @param {HTMLElement} container - Parent element containing the target element
 * @return {void}
 */
function scrollElementIntoView(target, container) {
    const windowInnerHeight = window.innerHeight;
    const windowscrollY = window.scrollY;

    let targetOffsetTop = container
        ? getOffsetTop(target)
        : target.getBoundingClientRect().top + windowscrollY;

    // Account for slide reveal if no container element is supplied
    if (!container && windowscrollY <= windowInnerHeight)
        targetOffsetTop += windowInnerHeight - windowscrollY;

    // Only scroll the window when target is not in view
    if (
        targetOffsetTop <= windowscrollY + 60 ||
        targetOffsetTop >= windowscrollY + windowInnerHeight - 60
    ) {
        const targetY = container
            ? windowscrollY +
              container.getBoundingClientRect().top +
              getOffsetTop(target, container.tagName) -
              windowInnerHeight / 2
            : targetOffsetTop - windowInnerHeight / 2;
        window.scrollTo(0, targetY);
    }
}

export { getOffsetTop, precisionRound, parseQueryString, scrollElementIntoView };
