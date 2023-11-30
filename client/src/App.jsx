import { RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import routes from "./router";
const App = () => {
  return (
    <Layout>
      <RouterProvider router={routes} />
    </Layout>
  );
};

export default App;
