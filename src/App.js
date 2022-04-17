import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

/** Routes */
import AppRoutes from "./routes";

/** Store */
import store from "./store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>
    </div>
  );
}

export default App;
