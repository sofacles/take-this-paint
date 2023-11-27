import { test } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import GiveAwayPaint from "./GiveAwayPaint";

test("should show validation errors on submitting an empty form ", async () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <GiveAwayPaint />
    </MemoryRouter>
  );
  const form = await waitFor(() => getByTestId("give-away-paint-form"));

  // Trying to register without entering credentials
  fireEvent.submit(form);

  await waitFor(() => getByText("Please upload a photo or pick a color"));
  await waitFor(() => getByText("Please add a name"));
  await waitFor(() => getByText("Please enter a brand"));
  await waitFor(() => getByText("Please enter a quantity"));
  await waitFor(() => getByText("Please add an email"));
  await waitFor(() => getByText("Please add a confirmEmail"));
  await waitFor(() => getByText("Please enter a sheen"));
});
