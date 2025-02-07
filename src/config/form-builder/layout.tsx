import styles from "./styles/grid.module.css";
import type { CSSProperties, PropsWithChildren } from "react";

type GridContainerProps = PropsWithChildren<{
  cols?: number;
  gap?: number;
}>;
const GridContainer = ({
  children,
  cols = 12,
  gap = 1,
}: GridContainerProps) => {
  return (
    <div
      className={styles["grid-container"]}
      style={
        {
          "--col-count": cols,
          "--gap": gap,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

type GridItemProps = PropsWithChildren<{
  span: number;
}>;
const GridItem = ({ children, span }: GridItemProps) => {
  console.log(span);
  return (
    <div
      className={styles["grid-item"]}
      style={{ "--span": span } as CSSProperties}
    >
      {children}
    </div>
  );
};

export { GridContainer, GridItem };
export type { GridItemProps, GridContainerProps };
