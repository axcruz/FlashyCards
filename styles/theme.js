import { StyleSheet } from 'react-native';

// Define a color palette with named colors
const colors = {
  primary: '#007AFF',
  secondary: '#4CAF50',
  tertiary: '#FFC107', // Tertiary color
  success: '#28A745', // Success color
  danger: '#DC3545', // Danger color
  info: '#17A2B8', // Info color
  warning: '#FFC107', // Warning color
  config: 'gray',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#333333',
  backgroundNeutral: '#575757',
  backgroundPanelLight: '#F5F5F5',
  backgroundPanelDark: '#606060',
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
    backgroundColor: colors.backgroundPanelLight,
    color: colors.textLight,
    borderColor: '#E8E9EB',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },
  input: {
    backgroundColor: colors.backgroundPanelLight,
    color: colors.textLight,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.textNeutral,
  }
};

// Define your themes with their respective style variations
const themes = {

  light: {
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
      backgroundColor: colors.backgroundLight,
    },
    primaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.secondary, 
    },
    tertiaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.tertiary,
    },
    successButton: {
      ...defaultStyles.button,
      backgroundColor: colors.success,
    },
    dangerButton: {
      ...defaultStyles.button,
      backgroundColor: colors.danger,
    },
    infoButton: {
      ...defaultStyles.button,
      backgroundColor: colors.info,
    },
    warningButton: {
      ...defaultStyles.button,
      backgroundColor: colors.warning
    },
    configButton: {
      ...defaultStyles.button,
      backgroundColor: colors.config
    },
    modalView: {
      ...defaultStyles.modalView,
      backgroundColor: colors.backgroundLight
    }
    // Add more styles for the light theme here
  },

  dark: {
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
     backgroundColor: colors.backgroundDark,
    },
    text: {
      ...defaultStyles.text,
      color: colors.textDark,
    },
    subText: {
        ...defaultStyles.subText,
        color: colors.textDark,
      },
    headerText: {
        ...defaultStyles.headerText,
        color: colors.textDark,
      },
      titleText: {
        ...defaultStyles.titleText,
        color: colors.textDark,
      },
    primaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.secondary,
    },
    tertiaryButton: {
      ...defaultStyles.button,
      backgroundColor: colors.tertiary,
    },
    successButton: {
      ...defaultStyles.button,
      backgroundColor: colors.success,
    },
    dangerButton: {
      ...defaultStyles.button,
      backgroundColor: colors.danger,
    },
    infoButton: {
      ...defaultStyles.button,
      backgroundColor: colors.info,
    },
    warningButton: {
      ...defaultStyles.button,
      backgroundColor: colors.warning,
    },
    configButton: {
      ...defaultStyles.button,
      backgroundColor: colors.config
    },
    card: {
      ...defaultStyles.card,
      color: colors.textDark,
    },
    input: {
      ...defaultStyles.input,
      backgroundColor: colors.backgroundPanelDark,
      color: colors.textDark,
    },
    modalView: {
      ...defaultStyles.modalView,
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
