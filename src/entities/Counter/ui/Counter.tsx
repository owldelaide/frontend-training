import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/CounterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const counterValue = useCounterValue();
    const { decrement, increment, add } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleAdd = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={handleInc}>
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDec}>
                {t('decrement')}
            </Button>
            <Button onClick={handleAdd}>
                {t('decrement')}
            </Button>
        </div>
    );
};