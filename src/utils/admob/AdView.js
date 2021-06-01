import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import {MediaView} from './MediaView';
import {adUnitIDs} from './utils';

export const AdView = React.memo(({index, media, type, loadOnMount = true}) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef();

  const onAdFailedToLoad = (event) => {
    setError(true);
    setLoading(false);
    console.log('Load failed');
  };

  const onUnifiedNativeAdLoaded = (event) => {
    setLoading(false);
    setLoaded(true);
    setError(false);
    setAspectRatio(event.aspectRatio);
  };

  useEffect(() => {
    if (loadOnMount) {
      setLoading(true);
      setLoaded(false);
      setError(false);
      nativeAdRef.current?.loadAd();
    }
    return () => {
      setLoaded(false);
    };
  }, [type]);

  return (
    <NativeAdView
      ref={nativeAdRef}
      onAdFailedToLoad={onAdFailedToLoad}
      onUnifiedNativeAdLoaded={onUnifiedNativeAdLoaded}
      style={{
        width: '98%',
        alignSelf: 'center',
      }}
      adUnitID={type === 'image' ? adUnitIDs.image : adUnitIDs.video} // REPLACE WITH NATIVE_AD_VIDEO_ID for video ads.
    >
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: !loading && !error && loaded ? 0 : 1,
            zIndex: !loading && !error && loaded ? 0 : 10,
          }}>
          {loading && <ActivityIndicator size={28} color="#a9a9a9" />}
          {error && <Text style={{color: '#a9a9a9'}}>:-(</Text>}
        </View>

        <View
          style={{
            height: 100,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            opacity: loading || error || !loaded ? 0 : 1,
          }}>
          <IconView
            style={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              width: '60%',
              maxWidth: '60%',
              paddingHorizontal: 6,
            }}>
            <HeadlineView
              hello="abc"
              style={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
            />
            <TaglineView
              numberOfLines={2}
              style={{
                fontSize: 11,
              }}
            />
            <AdvertiserView
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StoreView
                style={{
                  fontSize: 12,
                }}
              />
              <StarRatingView
                starSize={12}
                fullStarColor="orange"
                emptyStarColor="gray"
                containerStyle={{
                  width: 65,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          <CallToActionView
            style={{
              minHeight: 45,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              maxWidth: 100,
              width: 80,
            }}
            buttonAndroidStyle={{
              backgroundColor: '#00ff00',
              borderRadius: 5,
            }}
            allCaps
            textStyle={{
              fontSize: 13,
              flexWrap: 'wrap',
              textAlign: 'center',
            }}
          />
        </View>

        {media ? <MediaView aspectRatio={aspectRatio} /> : null}
      </View>
    </NativeAdView>
  );
});
