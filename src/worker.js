import { definePlugin } from '@starcyrene/cyrene-name-roller/plugin-sdk'

// UI-only plugin: the Worker exists so Web/Tauri can create a valid plugin instance.
export default definePlugin({
  activate() {},
  deactivate() {}
})
