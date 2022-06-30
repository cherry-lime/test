import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import * as helpers from "../helpers";

describe("Testing helper function", () => {
  type Row = {
    id: number;
    order: number;
    name: string;
  };

  it("addRow should add row to state", () => {
    const rows: Row[] = [{ id: 1, order: 1, name: "Clark Kent" }];

    expect(
      helpers.addRow(rows, { id: 2, order: 2, name: "Bruce Wayne" })
    ).toStrictEqual([
      { id: 1, order: 1, name: "Clark Kent" },
      { id: 2, order: 2, name: "Bruce Wayne" },
    ]);
  });
});
