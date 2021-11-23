import logo from 'assets/images/logo.png';
import vubaMoneyLogo from 'assets/images/logo/vuba-money-logo.png';
import logoFilled2u from 'assets/images/2u-money-logo-filled.svg';
import logoFilledVuba from 'assets/images/logo/vuba-money-filled.svg';
import logoWhiteText2u from 'assets/images/MasterLOGO-white.svg';
import vubaLogoWhiteText from 'assets/images/logo/vuba-money-white-text.svg';
import logoWhiteBg2u from 'assets/images/2u-money-logo.svg';
import logoWhiteBgVuba from 'assets/images/logo/vuba-money-white-background.svg';

const assets = {
  '2u': {
    logoIcon: logo,
    logoWhiteText: logoWhiteText2u,
    logoWhiteBg: logoWhiteBg2u,
    logoFilled: logoFilled2u,
  },
  vuba: {
    logoIcon: vubaMoneyLogo,
    logoWhiteText: vubaLogoWhiteText,
    logoWhiteBg: logoWhiteBgVuba,
    logoFilled: logoFilledVuba,
  },
};
export default assets[
  (process.env.REACT_APP_PLATFORM || '2u').trim()
];
