import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Autocomplete } from "@mui/material";

function Input(props) {
    // TODO: array lookups is expensive (props.exchangeRates[props.currency])
    return (
        <Grid container direction="row" wrap="nowrap" gap={1}>
            <Grid item xs={6}>
                <TextField
                    style={{ width: "100%" }}
                    type="number"
                    onChange={(e) => props.onAmountChange(e, props.exchangeRates[props.currency])}
                    label="Amount"
                    variant="outlined"
                    value={props.amount}
                />
            </Grid>

            <Grid item xs={6}>
                {/* TODO: disablePortal ? */}
                <Autocomplete
                    value={props.currencies[props.currency]}
                    onChange={(e, newValue) =>
                        props.onCurrencyChange(e, newValue, props.exchangeRates[props.currency])
                    }
                    disablePortal
                    disableClearable
                    options={Object.entries(props.currencies).map((obj) => obj[1])}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />
            </Grid>
        </Grid>
    );
}

Input.defaultProps = {
    amount: 0,
};

// TODO: proper types
Input.propTypes = {
    currencies: PropTypes.object.isRequired,
    exchangeRates: PropTypes.object.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    amount: PropTypes.number,
    currency: PropTypes.string.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
};

export default Input;
