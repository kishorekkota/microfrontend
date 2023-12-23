
import React from "react";
import { createRoot }  from "react-dom/client";
import Hello from "./Hello";
import Test from "./Test";
import App from "./App";
import { StripeProvider } from '@stripe/stripe-react-native';

// const helloDiv = document.createElement("div");
// helloDiv.innerHTML = "Hello from Javascript!";
// document.body.append(helloDiv);

const container = document.getElementById("root");
const root = createRoot(container);

//root.render(<Test />);

const AppWithStripe = () => {
    return (
        <StripeProvider
        publishableKey="pk_test_51NkRw9HzAmJuqBlhBJ7xgpeZtvf2VJ5zVmhDlyxx0ibUbgJPjnusPdDfW2c7MoxGW0FkAsjv4o53VudTHPNsdNxg005EJnBA8u">
        <App />
      </StripeProvider>
    );
  };

root.render(<AppWithStripe />);

