const platform = process.env.REACT_APP_PLATFORM;
const themeURL =
  platform === 'vuba' ? './theme/vuba.css' : './theme/2u-money.css';

const link = document.createElement('link');
link.href = themeURL;
link.rel = 'stylesheet';

const otherLinks = document.head.querySelectorAll('link');
const lastLink = otherLinks[otherLinks.length - 1];
lastLink.insertAdjacentElement('afterend', link);
