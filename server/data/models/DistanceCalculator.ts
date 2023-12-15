//Thanks to https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
const R = 6371; // km
const KM_to_Miles = 0.62137119;

const toRad = function (n) {
  return (n * Math.PI) / 180;
};

const GetDistanceBetween = (lat1, lon1, lat2, lon2) => {
  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * KM_to_Miles;
};

export default GetDistanceBetween;
