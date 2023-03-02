import React from "react";
import { classNames } from "../../utils";
import styles from "./ColHeaderTable.module.scss";
import { GoCheck, GoX } from "react-icons/go";

export function ColHeaderTable(props) {
  const { className, headers, rows, headerRow = true, ...rest } = props;

  return (
    <section className={styles.colHeaderTable}>
      <table>
        <tbody>
          {rows?.map((row, poss) => (
            <tr key={`main-${poss}`}>
              <th scope={headerRow && poss === 0 ? "col" : "row"}>
                {headers[poss]}
              </th>
              {row?.map((com, index) => {
                const Tag = headerRow && poss === 0 ? "th" : "td";
                const cProps = Tag === "th" ? { scope: "col" } : {};
                return (
                  <Tag
                    key={`row-${index}`}
                    {...cProps}
                    className={classNames(
                      com === true &&
                        index === row?.length - 1 &&
                        "text-secondary",
                    )}
                  >
                    {com === true ? (
                      <GoCheck />
                    ) : com === false ? (
                      <GoX />
                    ) : typeof com === "function" ? (
                      com()
                    ) : (
                      com
                    )}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
