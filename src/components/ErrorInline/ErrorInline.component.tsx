import { red } from "@material-ui/core/colors";
import { ReactNode } from "react";

interface ErrorInlineProps {
    children: ReactNode;
}

export function ErrorInine({ children }: ErrorInlineProps) {
    
    return(
        <p style={{marginTop: 0, fontSize: 12, color: red[500]}}>
            {children}
        </p>
    )
}