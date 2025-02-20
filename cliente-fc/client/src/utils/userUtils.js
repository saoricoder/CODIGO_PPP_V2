export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user ? user.id_usuario : null;
};