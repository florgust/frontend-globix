export const getDefaultImage = (type: 'trip' | 'user' | 'cover') => {
  const defaultImages = {
    trip: '/default/default-trip.webp',
    user: '/default/default-user.webp', 
    cover: '/images/default-cover.jpg'
  };
  
  return defaultImages[type];
};