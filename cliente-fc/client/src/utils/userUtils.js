export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user')); // Changed from 'userData' to 'user'
    return user || null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user')); // Changed from 'userData' to 'user'
    return user ? user.id_usuario : null;
  } catch (error) {
    console.error('Error getting logged-in user ID:', error);
    return null;
  }
};

export const getLoggedInUserId = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('user')); // Changed from 'userData' to 'user'
    return userData ? userData.id_usuario : null;
  } catch (error) {
    console.error('Error getting logged-in user ID:', error);
    return null;
  }
};