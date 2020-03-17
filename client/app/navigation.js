import { browserHistory } from 'react-router-dom';

/**
 * Handle internal navigation
 */
export default function(e) {
    e.preventDefault();

    const href = e.currentTarget.getAttribute('href');

    if (typeof href === 'string') {
        browserHistory.push(href);
    }
}
