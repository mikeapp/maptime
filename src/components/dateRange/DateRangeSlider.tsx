import {Slider} from "@mui/material";
import React from "react";
import {Manifest} from "../../iiif/Manifest";
import {Collection} from "../../iiif/Collection";

type DateRangeSliderProps = {
    collection: Collection | null;
    disabled: boolean;
    dateRange: number[];
    setDateRange: (range: number[]) => void;
}

const DateRangeSlider = ({collection, dateRange, setDateRange, disabled} : DateRangeSliderProps) => {
    const manifestYears: number[] = collection?.manifests().flatMap(manifest => manifest.navDateYear()).filter((v): v is number => v !== null) || [];
    const marks = Array.from(new Set(manifestYears)).map((v) => ({ value: v, label: null}) );
    const lowestYear = Math.min(...manifestYears);
    const highestYear = Math.max(...manifestYears);

    const handleDateChange = (event: any, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) newValue = [newValue, newValue];
        setDateRange(newValue);
    };

    return (
        <Slider
            getAriaLabel={() => 'Years'}
            value={dateRange}
            min={lowestYear}
            max={highestYear}
            step={1}
            sx={{width: "60%", verticalAlign: "middle"}}
            marks={marks}
            onChange={handleDateChange}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => "" + value}
            disableSwap
            disabled={disabled}
        />
    );
}

export default DateRangeSlider;