// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#016699",
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  };
}
