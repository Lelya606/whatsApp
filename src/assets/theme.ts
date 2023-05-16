import { DefaultTheme } from 'styled-components';

type ThemeFieldType = { [key: string]: string };

export interface Theme extends DefaultTheme {
  colors: ThemeFieldType;
  boxShadow: string;
}

export const defaultTheme: Theme = {
  colors: {
    WHITE: '#FFFFFF',
    ATHENS_GRAY: '#F0F2F5',
    PORCELAIN: '#E9EDEF',
    PAMPAS: '#EAE6DF',
    PALE_SKY: '#667781',
    SHUTTLE_GRAY: '#54656F',
    RIVER_BED: '#41525D',
    BUNKER: '#111B21',
    PERSIAN_GREEN: '#00A884',
  },
  boxShadow: '0 6px 18px rgba(11, 20, 26, 0.05)',
};
