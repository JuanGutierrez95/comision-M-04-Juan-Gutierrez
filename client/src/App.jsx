import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./layout/Layout.jsx";
import AppRouter from "./router/AppRouter.jsx";

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
