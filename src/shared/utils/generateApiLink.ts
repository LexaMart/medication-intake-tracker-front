import Config from 'react-native-config';

export const generateApiLink = (route: string): string => {
  return `${Config.API_URL}${route}`;
};
