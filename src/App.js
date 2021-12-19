import {
    Grid,
    createTheme,
    ThemeProvider,
    IconButton,
    CircularProgress,
    Link,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import Input from "./Components/Input";

const fetchWithFallback = async (links, obj) => {
    let response;
    for (let link of links) {
        try {
            response = await fetch(link, obj);
            if (response.ok) return response;
        } catch (e) {}
    }
    return response;
};

function App() {
    const defaultMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    const [mode, setMode] = React.useState(defaultMode);
    const theme = createTheme({
        palette: { mode },
    });

    // TODO: better state management ?
    const [currencies, setCurrencies] = React.useState([]);
    const [exchangeRates, setExchangeRates] = React.useState([]);
    const [amount0, setAmount0] = React.useState();
    const [amount1, setAmount1] = React.useState();
    const [currency0, setCurrency0] = React.useState("inr");
    const [currency1, setCurrency1] = React.useState("usd");

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // FAKE SLEEP USED (SEE BELOW)

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    React.useEffect(() => {
        async function fetchData() {
            // fake sleep :)
            await new Promise((r) => setTimeout(r, 1000));
            fetchWithFallback([
                "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json",
                "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json",
            ])
                .then((response) => response.json())
                .then((data) => setCurrencies(data));
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            // fake sleep :)
            await new Promise((r) => setTimeout(r, 1000));
            fetchWithFallback([
                "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr.min.json",
                "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr.json",
            ])
                .then((response) => response.json())
                .then((data) => setExchangeRates(data.inr));
        }
        fetchData();
    }, []);

    // TODO: array lookup is expensive...
    // same issue in some lines of Input.js, as well
    const onChange0 = (e, exchangeRate) => {
        setAmount0(e.target.value);
        setAmount1((e.target.value * exchangeRates[currency1]) / exchangeRate);
    };

    const onChange1 = (e, exchangeRate) => {
        setAmount1(e.target.value);
        setAmount0((e.target.value * exchangeRates[currency0]) / exchangeRate);
    };

    const onCurrencyChange0 = (e, oldExchangeRate) => {
        setCurrency0(e.target.value);
        setAmount0((amount0 * exchangeRates[e.target.value]) / oldExchangeRate);
    };

    const onCurrencyChange1 = (e, oldExchangeRate) => {
        setCurrency1(e.target.value);
        setAmount1((amount1 * exchangeRates[e.target.value]) / oldExchangeRate);
    };

    return (
        // <div
        //     style={{
        //         // to make the main paper centered
        //         backgroundColor: theme.palette.background.default,
        //         display: "flex",
        //         flexDirection: "row",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         height: "100vh",
        //     }}
        // >
        <ThemeProvider theme={theme}>
            <Paper
                // to make the main grid centered
                style={{
                    backgroundColor: theme.palette.background.default,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    style={{
                        position: "absolute",
                        top: "100px",
                    }}
                    variant="h4"
                >
                    Convert your currency
                </Typography>
                {currencies.length === 0 || exchangeRates.length === 0 ? (
                    <CircularProgress />
                ) : (
                    <Grid
                        container
                        direction="row"
                        gap={3}
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            <Input
                                currencies={currencies}
                                exchangeRates={exchangeRates}
                                onAmountChange={onChange0}
                                amount={amount0}
                                currency={currency0}
                                onCurrencyChange={onCurrencyChange0}
                            />
                        </Grid>

                        <Grid item>
                            <Input
                                currencies={currencies}
                                exchangeRates={exchangeRates}
                                onAmountChange={onChange1}
                                amount={amount1}
                                currency={currency1}
                                onCurrencyChange={onCurrencyChange1}
                            />
                        </Grid>
                    </Grid>
                )}

                <Link
                    style={{
                        position: "absolute",
                        top: "50px",
                        left: "50px",
                    }}
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
                <IconButton
                    style={{
                        position: "absolute",
                        top: "50px",
                        right: "50px",
                    }}
                    onClick={(e) => {
                        mode === "dark" ? setMode("light") : setMode("dark");
                    }}
                >
                    {theme.palette.mode === "dark" ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
