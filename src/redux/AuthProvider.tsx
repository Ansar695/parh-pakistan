"use client";
import { Provider } from "react-redux";
import { store } from "./store";

const AuthProvider = ({ children }: any) => {
  return (
    <Provider store={store}>
      {/* <ProtectedRoute>{children}</ProtectedRoute> */}
      {children}
    </Provider>
  );
};

export default AuthProvider;
