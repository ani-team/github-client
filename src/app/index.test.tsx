import React from "react";
import { render } from "@testing-library/react";
import App from ".";

test("renders without crashing", async () => {
    const screen = render(<App />);
    expect(await screen.findByTestId("gc-app")).toBeInTheDocument();
});
