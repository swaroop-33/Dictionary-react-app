import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // if you prefer SWC, switch to '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
});
