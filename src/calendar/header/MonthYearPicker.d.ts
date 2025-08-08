import React from 'react';
import XDate from 'xdate';
export interface MonthYearPickerProps {
    visible: boolean;
    initialDate: XDate;
    onClose: () => void;
    onConfirm: (monthIndex: number, year: number) => void;
    minYear?: number;
    maxYear?: number;
}
declare const MonthYearPicker: ({ visible, initialDate, onClose, onConfirm, minYear, maxYear }: MonthYearPickerProps) => React.JSX.Element;
export default MonthYearPicker;
