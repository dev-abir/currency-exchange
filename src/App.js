import { Grid, createTheme, ThemeProvider, IconButton, CircularProgress } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import Input from "./Components/Input";
import Header from "./Components/Header";

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
    const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const [mode, setMode] = React.useState(defaultMode);
    const theme = createTheme({
        palette: { mode },
    });

    // TODO: better state management ?
    const [currencies, setCurrencies] = React.useState([]);
    const [exchangeRates, setExchangeRates] = React.useState([]);
    const [amount0, setAmount0] = React.useState(0);
    const [amount1, setAmount1] = React.useState(0);
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
            await new Promise((r) => setTimeout(r, 500));
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
            await new Promise((r) => setTimeout(r, 500));
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
        // typecast to Number to supress wrong prop type warning
        setAmount0(Number(e.target.value));
        setAmount1((e.target.value * exchangeRates[currency1]) / exchangeRate);
    };

    const onChange1 = (e, exchangeRate) => {
        // typecast to Number to supress wrong prop type warning
        setAmount1(Number(e.target.value));
        setAmount0((e.target.value * exchangeRates[currency0]) / exchangeRate);
    };

    // TODO: again, array lookups are slow :(
    // Ugliness.... :)
    const getCurrencyCodeFromName = (name) => {
        return Object.entries(currencies).filter((obj) => obj[1] === name)[0][0];
    };

    const onCurrencyChange0 = (e, newCurrency, oldExchangeRate) => {
        const currencyCode = getCurrencyCodeFromName(newCurrency);
        setCurrency0(currencyCode);
        setAmount0((amount0 * exchangeRates[currencyCode]) / oldExchangeRate);
    };

    const onCurrencyChange1 = (e, newCurrency, oldExchangeRate) => {
        const currencyCode = getCurrencyCodeFromName(newCurrency);
        setCurrency1(currencyCode);
        setAmount1((amount1 * exchangeRates[currencyCode]) / oldExchangeRate);
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                // to make the main grid centered
                style={{
                    backgroundColor: theme.palette.background.default,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Header />

                {currencies.length === 0 || exchangeRates.length === 0 ? (
                    <CircularProgress />
                ) : (
                    <Grid
                        container
                        direction="row"
                        gap={3}
                        justifyContent="space-evenly"
                        alignItems="center"
                        style={{ padding: "1rem" }}
                    >
                        <Grid item xs={12} md={6}>
                            <Input
                                currencies={currencies}
                                exchangeRates={exchangeRates}
                                onAmountChange={onChange0}
                                amount={amount0}
                                currency={currency0}
                                onCurrencyChange={onCurrencyChange0}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
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

                {/* FIXME: This button jumps up, when a keyboard appears
                (while typing in mobiles) (try to change the currency of 2nd input) */}
                <IconButton
                    style={{
                        position: "fixed",
                        bottom: "50px",
                        right: "50px",
                    }}
                    onClick={(e) => (mode === "dark" ? setMode("light") : setMode("dark"))}
                >
                    {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </div>
        </ThemeProvider>
    );
}

export default App;
