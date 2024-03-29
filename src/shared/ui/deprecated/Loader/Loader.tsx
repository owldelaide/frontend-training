import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string,
}

/**
 * Устарел, используем новые компоненты
 * @deprecated
 */
export const Loader = ({ className }: LoaderProps) => {
    return (
        <div className={classNames('lds-facebook', {}, [])}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};