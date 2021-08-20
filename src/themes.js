const platform = process.env.REACT_APP_PLATFORM;
const themeURL =
  platform === 'vuba' ? './theme/vuba.css' : './theme/2u-money.css';

const link = document.createElement('link');
link.href = themeURL;
link.rel = 'stylesheet';

const otherLinks = document.head.querySelectorAll('link');
const lastLink = otherLinks[otherLinks.length - 1];
lastLink.insertAdjacentElement('afterend', link);

// set up initial page loader
const pageLoaders = {
  '2u': { path: '2ULogo.png', alt: '2U Money' },
  vuba: { path: 'vuba-money-logo.png', alt: 'Vuba Money' },
};

const initialLoader = document.createElement('img');
initialLoader.src = pageLoaders[platform].path;
initialLoader.alt = pageLoaders[platform].alt;
initialLoader.classList.add('initial-page-loader-img');

document
  .querySelector('.initial-page-loader')
  .appendChild(initialLoader);
