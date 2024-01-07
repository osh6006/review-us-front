import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToastProvider from "./providers/toast-provider";

import { RecoilRoot } from "recoil";

import Routes from "./routes/routes";
import ModalProvider from "./providers/modal-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Create a client
const queryClient = new QueryClient();
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || "";

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <GoogleOAuthProvider clientId={clientId}>
          <ToastProvider />
          <ModalProvider />
          <Routes />
        </GoogleOAuthProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
