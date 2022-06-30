import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import * as helpers from "../helpers";

describe("Testing helper function", () => {
  type Row = {
    id: number;
    order: number;
    name: string;
  };

  const rows: Row[] = [{ id: 1, order: 1, name: "Clark Kent" }];

  it("addRow should add row to state", () => {
    expect(
      helpers.addRow(rows, { id: 2, order: 2, name: "Bruce Wayne" })
    ).toStrictEqual([
      { id: 1, order: 1, name: "Clark Kent" },
      { id: 2, order: 2, name: "Bruce Wayne" },
    ]);
  });
});
