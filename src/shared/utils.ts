import bcrypt from 'bcrypt';

export const isPasswordMatch = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};
