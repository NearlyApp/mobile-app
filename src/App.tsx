import AppShell from "@/AppShell";
import ReactQueryProvider from "@components/ReactQueryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "@components/ui/toast";

export default function App() {
  return (
    <SafeAreaProvider>
      <ReactQueryProvider>
        <Toast.Provider>
          <AppShell />
        </Toast.Provider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
