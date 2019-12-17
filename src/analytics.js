import ReactGA from 'react-ga';
import { ANALYTICS_UA } from './settings';

const initializeGA = () => {
  ReactGA.initialize(ANALYTICS_UA);
};

const pageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const sendEvent = (category, action, label = '', value = 1, nonInteraction = false) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
    nonInteraction,
  });
};

export {
  initializeGA,
  pageView,
  sendEvent,
};
