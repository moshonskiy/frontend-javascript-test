import React, { useState } from "react";
import { ArrowIcon } from "../ArrowIcon/ArrowIcon";

export const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [arrowRotateToggle, setArrowRotateToggle] = useState(false);

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
    setArrowRotateToggle(!arrowRotateToggle);
  };

  return (
    <tr>
      {headers.map(({ field, sortable }) => (
        <th key={field}>
          {field}
          &nbsp;
          <span onClick={() => (sortable ? onSortingChange(field) : null)}>
            <ArrowIcon arrowRotateToggle={arrowRotateToggle} />
          </span>
        </th>
      ))}
    </tr>
  );
};
