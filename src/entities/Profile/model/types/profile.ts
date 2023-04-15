import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency/model/types/currency';

export interface Profile {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    avatar?: string;
}

