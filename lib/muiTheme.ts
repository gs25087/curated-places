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
          backgroundColor: 'rgba(256, 256, 256, 1)'
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
          backgroundColor: 'transparent',
          borderRadius: '5px',
          marginBottom: '2px'
        }
      }
    }
  }
};
