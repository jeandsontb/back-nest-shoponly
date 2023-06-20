import { compare, hash } from 'bcrypt';

export const createPasswordHashed = async (
  password: string,
): Promise<string> => {
  const saltRoundCrypt = 10;
  return hash(password, saltRoundCrypt);
};

export const validatePassword = async (
  password: string,
  passwordHashed: string,
): Promise<boolean> => {
  return compare(password, passwordHashed);
};
