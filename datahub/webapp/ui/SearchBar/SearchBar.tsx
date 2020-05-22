import * as classNames from 'classnames';
import React from 'react';

import { matchKeyPress } from 'lib/utils/keyboard';
import { DebouncedInput } from 'ui/DebouncedInput/DebouncedInput';
import { Button } from 'ui/Button/Button';

import './SearchBar.scss';

export interface ISearchBarProps {
    className?: string;
    value: string;
    isSearching?: boolean;
    onSearch?: (value: string) => any;
    placeholder?: string;
    inputClassName?: string;

    isRounded?: boolean;
    hasIcon?: boolean;
    transparent?: boolean;
    autoFocus?: boolean;
    delayMethod?: 'throttle' | 'debounce';

    hasClearSearch?: boolean;
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
    value,

    isSearching = false,
    onSearch = null,
    placeholder = 'Search',

    isRounded = false,
    hasIcon = false,
    autoFocus = false,
    delayMethod = 'debounce',

    hasClearSearch = false,

    className,
    inputClassName,
    transparent,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (autoFocus) {
            // setTimeout is needed to make the focus work
            // otherwise the component
            setTimeout(() => {
                inputRef.current.focus();
            }, 0);
        }
    }, []);

    const onSearchRequest = () => {
        if (onSearch) {
            onSearch(value);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (matchKeyPress(event, 'Enter')) {
            onSearchRequest();
        }
    };

    const searchIcon = hasIcon ? (
        <span className="icon is-small is-left">
            <i
                className={`fas ${
                    isSearching ? 'fa-spinner fa-pulse' : 'fa-search'
                }`}
            />
        </span>
    ) : null;

    const searchBarClassName = classNames({
        SearchBar: true,
        [className]: Boolean(className),
    });

    const clearSearchButton =
        !searchIcon && hasClearSearch && value ? (
            <>
                <span className="search-bar-clear-sep" />
                <Button borderless pushable onClick={() => onSearch('')}>
                    Clear
                </Button>
            </>
        ) : null;

    return (
        <div className={searchBarClassName}>
            <DebouncedInput
                debounceMethod={delayMethod}
                onChange={onSearch}
                value={value}
                transparent={transparent}
                inputProps={{
                    placeholder,
                    className: classNames({
                        'is-rounded': isRounded,
                        [inputClassName]: !!inputClassName,
                    }),
                    type: 'text',
                    onKeyDown,
                    ref: inputRef,
                }}
            />
            {searchIcon}
            {clearSearchButton}
        </div>
    );
};
