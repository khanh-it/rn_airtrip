/**
 * image url homescreen
 */
// Define images
const host = global.__DEV__
    ? 'https://www-airtrip-renewal-dev.airtrip.jp/images/'
    : 'https://www.airtrip.jp/images/'
;
const images = [
    {
        uri: host + 'airport_images_android/HND.jpg',
    },
    {
        uri: host + 'airport_images_android/KOJ.jpg',
    },
    {
        uri: host + 'airport_images/SIN.jpg',
    },
    {
        uri: host + 'airport_images_android/MMY.jpg',
    }
];
export default images;
