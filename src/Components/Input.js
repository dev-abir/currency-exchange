import React from "react";
import PropTypes from "prop-types";
import {
    Grid,
    MenuItem,
    Select,
    TextField,
    FormControl,
    InputLabel,
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
                    value={props.amount || 0}
                />
            </Grid>

            <Grid item xs={6}>
                <FormControl>
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
                </FormControl>
            </Grid>
        </Grid>
    );
}

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
