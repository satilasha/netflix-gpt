"use client";

import Body from "@/components/Body";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

export default function Home() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}
