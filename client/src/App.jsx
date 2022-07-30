import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterOutlet from "./router/RouterOutlet";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterOutlet />
    </QueryClientProvider>
  );
}

export default App;
