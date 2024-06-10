// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css';

import { ThemeProvider } from "@mui/system"
import { SettingsConsumer } from "./contexts/settings/settings-consumer"
import { SettingsProvider } from "./contexts/settings/settings-provider"
import { createTheme } from './theme'
import { CssBaseline } from "@mui/material"
import { SettingsButton } from "./components/settings/settings-button"
import { SettingsDrawer } from "./components/settings/settings-drawer/settings-drawer"
import { Toaster } from "./components/toaster"
import { useRoutes } from "react-router-dom"
import { routes } from "./routes"

function App() {
  const page = useRoutes(routes)

  return (
    <SettingsProvider>
      <SettingsConsumer>
        {(settings) => {
          if (!settings.isInitialized) {
            return <h1>Loading</h1>
          }

          const theme = createTheme({
            colorPreset: settings.colorPreset,
            contrast: settings.contrast,
            direction: settings.direction,
            paletteMode: settings.paletteMode,
            responsiveFontSizes: settings.responsiveFontSizes,
          });

          return (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <>
                {page}
                <SettingsButton onClick={settings.handleDrawerOpen} />
                <SettingsDrawer
                  canReset={settings.isCustom}
                  onClose={settings.handleDrawerClose}
                  onReset={settings.handleReset}
                  onUpdate={settings.handleUpdate}
                  open={settings.openDrawer}
                  values={{
                    colorPreset: settings.colorPreset,
                    contrast: settings.contrast,
                    direction: settings.direction,
                    paletteMode: settings.paletteMode,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    stretch: settings.stretch,
                    layout: settings.layout,
                    navColor: settings.navColor,
                  }}
                />
              </>
              <Toaster/>
            </ThemeProvider>
          )
        }}
      </SettingsConsumer>
    </SettingsProvider>
  )
}

export default App
