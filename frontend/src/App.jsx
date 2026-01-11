import { RouterProvider } from "react-router-dom";
import "./App.css";
import indexRouter from "./router/Index";

function App() {
  return (
    <div>
      <RouterProvider router={indexRouter} />
    </div>
  );
}

export default App;
