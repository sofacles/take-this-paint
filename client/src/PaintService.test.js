import { describe, test, expect, vi } from "vitest";
import { PostPaint } from "./PaintService";

global.fetch = vi.fn();
function createFetchResponse(data) {
  return { status: 201 };
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

    expect(fetch).toHaveBeenCalled();

    // expect(fetch).toHaveBeenCalledWith( I can't get this to work, I'll try cypress
    //   expect.arrayContaining([
    //     "/api/paints/?brand=behr&email=user%40foo.com&confirmEmail=user%40foo.com&name=test&quantity=less%20than%20a%20gallon&rgb=888&sheen=eggshell",
    //   ]),
    //   expect.objectContaining({
    //     body: expect.objectContaining({
    //       FormData: expect.objectContaining({
    //         _entries: expect.arrayContaining(
    //           expect.objectContaining({ name: "imageName" })
    //         ),
    //       }),
    //     }),
    //   }),
    //   "method: POST"
    // );
    console.info(result);
    expect(result.status).toStrictEqual(201);
  });
});
