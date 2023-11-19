import { expect, test } from "vitest";

import ComplementaryColor from "./OppositeColor";

test("should wrap to zero if necessary", () => {
  const compl = ComplementaryColor("888");
  expect(compl).toEqual("000");
});

test("should parse hex digits that are letters", () => {
  expect(ComplementaryColor("19E")).toEqual("916");
});

test("should return hex digits that are letters", () => {
  expect(ComplementaryColor("75C")).toEqual("fd4");
});

test("should increase all the digits by 8", () => {
  expect(ComplementaryColor("000")).toEqual("888");
});
