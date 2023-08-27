import { StyleSheet } from 'react-native';
import { ColorSpace } from 'react-native-reanimated';

// Define a color palette with named colors
const colors = {
  primary: '#007AFF',
  secondary: '#4CAF50',
  tertiary: '#FFC107', // Tertiary color
  success: '#28A745', // Success color
  danger: '#DC3545', // Danger color
  info: '#17A2B8', // Info color
  warning: '#FFC107', // Warning color
  backgroundLight: '#F5F5F4',
  backgroundDark: '#333333',
  textLight: 'black',
  textDark: 'white',
  textNeutral: '#888888'
};

// Define a font palette with named font sizes
const fonts = {
  xSmall: 14,
  small: 16,
  medium: 18,
  large: 20,
  xLarge: 22,
  xxLarge: 24,
};

// Define default styles
const defaultStyles = {
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: fonts.medium, // Default font size
    color: colors.textLight, // Default text color
  },
  subText: {
    fontSize: fonts.xSmall, // Default font size
    color: colors.textLight, // Default text color
  },
  headerText: {
    fontSize: fonts.large, // Default font size
    color: colors.textLight, // Default text color
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: fonts.xLarge, // Default font size
    color: colors.textLight, // Default text color
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: fonts.medium, // Default font size for button text
    fontWeight: 'bold',
    color: colors.textDark,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderColor: colors.textNeutral,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textNeutral,
    backgroundColor: colors.backgroundLight,
    color: colors.textNeutral,
    borderRadius: 5,
    paddingLeft: 10,
  }
};

// Define your themes with their respective style variations
const themes = {
  light: {
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
      backgroundColor: colors.backgroundLight, // Background color for the light theme
    },
    primaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.primary, // Primary button background color
    },
    secondaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.secondary, // Secondary button background color
    },
    tertiaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.tertiary, // Tertiary button background color
    },
    successButton: {
      ...defaultStyles.button,
      backgroundColor: colors.success, // Success button background color
    },
    dangerButton: {
      ...defaultStyles.button,
      backgroundColor: colors.danger, // Danger button background color
    },
    infoButton: {
      ...defaultStyles.button,
      backgroundColor: colors.info, // Info button background color
    },
    warningButton: {
      ...defaultStyles.button,
      backgroundColor: colors.warning, // Warning button background color
    },
    sectionHeader: {
      ...defaultStyles.sectionHeader,
      backgroundColor: 'white'
    },
    // Add more styles for the light theme here
  },
  dark: {
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
     // backgroundColor: colors.backgroundDark, // Background color for the dark theme
    },
    text: {
      ...defaultStyles.text,
      color: colors.textDark, // Text color for the dark theme
    },
    subText: {
        ...defaultStyles.subText,
        color: colors.textDark, // Text color for the dark theme
      },
    headerText: {
        ...defaultStyles.headerText,
        color: colors.textDark, // Text color for the dark theme
      },
      titleText: {
        ...defaultStyles.titleText,
        color: colors.textDark, // Text color for the dark theme
      },
    primaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.primary, // Primary button background color
    },
    secondaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.secondary, // Secondary button background color
    },
    tertiaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.tertiary, // Tertiary button background color
    },
    successButton: {
      ...defaultStyles.button,
      backgroundColor: colors.success, // Success button background color
    },
    dangerButton: {
      ...defaultStyles.button,
      backgroundColor: colors.danger, // Danger button background color
    },
    infoButton: {
      ...defaultStyles.button,
      backgroundColor: colors.info, // Info button background color
    },
    warningButton: {
      ...defaultStyles.button,
      backgroundColor: colors.warning, // Warning button background color
    },
    card: {
      ...defaultStyles.card,
      backgroundColor: colors.backgroundDark
    },
    input: {
      ...defaultStyles.input,
      backgroundColor: colors.backgroundDark
    }
    // Add more styles for the dark theme here
  },
};

// Define a function to switch between themes
const getThemeStyles = (theme) => {
  return StyleSheet.create(themes[theme]);
};

export { getThemeStyles, colors, fonts };
