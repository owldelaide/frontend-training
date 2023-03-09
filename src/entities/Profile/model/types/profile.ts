import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency/model/types/currency';

export interface Profile {
    firstName?: string;
    lastName?: string;
    username?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    avatar?: string;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}