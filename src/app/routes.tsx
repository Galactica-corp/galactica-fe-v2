import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "pages/home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};
