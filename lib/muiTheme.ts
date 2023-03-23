export const muiTheme = {
  components: {
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: '5px',
          color: 'black' // Change this value to adjust the position of the secondary action
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          // Add your global styles for ListItem here
          width: '100%',
          maxWidth: 'none'
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          color: 'inherit',
          backgroundColor: '#fafafa',
          height: '22px'
        },
        '&:hover': {
          backgroundColor: 'red'
        },
        labelMedium: {
          paddingRight: '10px',
          paddingLeft: '10px'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Add your global styles for ListItem here
          color: 'rgba(0, 0, 0, 1)'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          // Add your global styles for ListItem here
          color: 'rgba(0, 0, 0, 1)'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          // Add your global styles for ListItem here
          borderRadius: '5px',
          marginBottom: '2px'
        }
      }
    }
  }
};
