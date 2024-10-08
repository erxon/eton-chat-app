import { ReactEventHandler } from "react";

export interface FieldTypes {
    type?: string;
    name: string;
    placeholder: string;
    style?: string;
    disabled?: boolean;
    defaultValue?: string | number | readonly string[];
    handleChange?: (term: string) => void;
}