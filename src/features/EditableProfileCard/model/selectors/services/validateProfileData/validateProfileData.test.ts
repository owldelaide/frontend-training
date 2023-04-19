import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '@/features/EditableProfileCard/model/consts/consts';

const data = {
    firstName: 'fN',
    lastName: 'lN',
    country: Country.Russia,
    age: 28,
    username: 'uN',
    city: 'ct',
    currency: Currency.RUB,
};

describe('validateProfileData.test', () => {
    test('no errors', async() => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without firstname and lastname', async() => {
        const result = validateProfileData({ ...data, firstName: '', lastName: ''});

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async() => {
        const result = validateProfileData({ ...data, age: undefined});

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('without country', async() => {
        const result = validateProfileData({ ...data, country: undefined});

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('all errors', async() => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});