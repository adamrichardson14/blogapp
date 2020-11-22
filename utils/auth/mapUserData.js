export const mapUserData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  console.log(token);
  return {
    id: uid,
    email,
    token,
  };
};
