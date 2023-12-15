import Layout from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </AuthProvider>
  );
};

export default App;
