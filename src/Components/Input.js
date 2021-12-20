import React from "react";
import PropTypes from "prop-types";
import {
    Grid,
    MenuItem,
    Select,
    TextField,
    FormControl,
    InputLabel,
    Autocomplete,
} from "@mui/material";

function Input(props) {
    // TODO: array lookups is expensive (props.exchangeRates[props.currency])
    return (
        <Grid
            container
            direction="row"
            wrap="nowrap"
            gap={1}
            style={{ padding: "5px" }}
        >
            <Grid item xs={6}>
                <TextField
                    type="number"
                    onChange={(e) =>
                        props.onAmountChange(
                            e,
                            props.exchangeRates[props.currency]
                        )
                    }
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
                        props.onCurrencyChange(
                            e,
                            newValue,
                            props.exchangeRates[props.currency]
                        )
                    }
                    disablePortal
                    disableClearable
                    id="combo-box-demo"
                    options={Object.entries(props.currencies).map(
                        (obj) => obj[1]
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Currency" />
                    )}
                />
                {/* <FormControl>
                    <InputLabel id="label">Currency</InputLabel>
                    <Select
                        style={{ width: "150px" }}
                        labelId="label"
                        value={props.currency}
                        label="Currency"
                        onChange={(e) =>
                            props.onCurrencyChange(
                                e,
                                props.exchangeRates[props.currency]
                            )
                        }
                    >
                        {Object.entries(props.currencies).map((obj, i) => (
                            <MenuItem key={i} value={obj[0]}>
                                {obj[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
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
