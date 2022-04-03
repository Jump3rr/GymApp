import { DefaultTheme } from '@react-navigation/native';
import { color } from '../constants/theme';

export const BWLDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.lime,
      background: color.grey,
      card: color.white,
      text: color.white,
      border: color.lime,
      notification:  color.lime,
    }
  };
