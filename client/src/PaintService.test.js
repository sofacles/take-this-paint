import { describe, test, expect, vi } from "vitest";
import { PostPaint } from "./PaintService";

global.fetch = vi.fn();
function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}
describe("PostPaint", () => {
  test("makes a POST request", async () => {
    const token = "12345";
    const paint = {
      brand: "behr",
      name: "test",
      oneOf: { rgb: "888" },

      email: "user@foo.com",
      confirmEmail: "user@foo.com",
      quantity: "less than a gallon",
      sheen: "eggshell",
    };
    const fakeHttpResponse = {
      status: 201,
      OK: "true",
    };

    fetch.mockResolvedValue(createFetchResponse(fakeHttpResponse));

    const response = await createFetchResponse({
      token,
      paint,
    });
    const result = await PostPaint(paint, token);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5173/api/paints/?name=test&email=user@foo.com&confirmEmail=user@foo.com&rgb=888&brand=behr&quantity=less%20than%20a%20gallon",
      {
        method: "POST",
        body: JSON.stringify(paint),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status).toStrictEqual(201);
  });
});
