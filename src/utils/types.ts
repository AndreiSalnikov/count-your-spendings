import React from "react";

export interface IWriteProps {
    userId: string;
    data: ISpend | IIncome
}

export interface ISpend {
    sum: number,
    operationName: string,
    date: string,
    category: string
}

export interface IIncome {
    sum: number,
    operationName: string,
    date: string,
}



export interface IPreloaderProps {
    className: string
}

export interface IPopupProps<T> {
    isPopupOpen: T;
    setIsPopupOpen: (state: T) => void;
}

export interface IChildrenProps {
    children: React.ReactNode
}
