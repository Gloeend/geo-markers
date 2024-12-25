import {PropsWithChildren} from "react";

export const SectionContainer = ({children, className}: {className?: string} & PropsWithChildren) => {
    return <section className={`wrap ${className}`}>{children}</section>;
}