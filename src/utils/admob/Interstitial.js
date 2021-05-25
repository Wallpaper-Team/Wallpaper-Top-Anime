import {InterstitialAd, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-2089873880879307/9418217417';

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
