import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

export default function Header() {
    return (
        <AppBar style={{ width: "100%", position: "fixed", top: 0 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Convert your currency
                </Typography>
                <Link
                    style={{ color: "inherit" }}
                    href="https://github.com/fawazahmed0/currency-api#readme"
                    target="_blank"
                    rel="noopener"
                    // rel="noopener" prevents the new page from being able to access
                    // the window.opener property and ensures it runs in a separate
                    // process. Without this, the target page can potentially redirect
                    // your page to a malicious URL.
                >
                    [Link to API]
                </Link>
            </Toolbar>
        </AppBar>
    );
}
