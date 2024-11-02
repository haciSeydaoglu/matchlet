/**
 * Represents a value that can be either a direct value or a function returning that value
 */
type MatchValue<Sonuc> = Sonuc | (() => Sonuc);

/**
 * Base options type for pattern matching
 */
type BaseOptions<T extends string | number | symbol, Sonuc = any> = {
    [key in T]?: MatchValue<Sonuc>;
};

/**
 * Options type when a default value is provided using _default key
 */
type WithDefault<T extends string | number | symbol, Sonuc = any> = BaseOptions<T, Sonuc> & {
    _default: MatchValue<Sonuc>;
};

/**
 * Options type when no default value is provided (all keys are required)
 */
type WithoutDefault<T extends string | number | symbol, Sonuc = any> = Required<BaseOptions<T, Sonuc>>;

/**
 * Type guard to check if a value is a function
 */
function isFunction<T>(value: MatchValue<T>): value is () => T {
    return typeof value === 'function';
}

/**
 * Pattern matching function similar to PHP's match expression.
 *
 * @param key - The key to match against
 * @param options - Object containing the patterns and their corresponding values/functions
 * @example
 * ```typescript
 * // Basic usage with default value
 * const result1 = match('a', {
 *     a: 'value1',
 *     b: 'value2',
 *     _default: 'default value'
 * });
 *
 * // Using with functions
 * const result2 = match('x', {
 *     a: () => 'value1',
 *     _default: () => 'not found'
 * });
 *
 * // Without default (all keys required)
 * const result3 = match('a', {
 *     a: 'value1',
 *     b: 'value2'
 * });
 * ```
 */
export function match<T extends string | number | symbol, Sonuc = any>(
    key: T,
    options: WithoutDefault<T, Sonuc>
): Sonuc;
export function match<T extends string | number | symbol, Sonuc = any>(
    key: T,
    options: WithDefault<T, Sonuc>
): Sonuc;
export function match<T extends string | number | symbol, Sonuc = any>(
    key: T,
    options: WithDefault<T, Sonuc> | WithoutDefault<T, Sonuc>
): Sonuc {
    const value = options[key] as MatchValue<Sonuc> | undefined;

    if (value === undefined) {
        const defaultValue = (options as WithDefault<T, Sonuc>)._default;
        if (defaultValue === undefined) {
            throw new Error(`No matching value found for key: ${String(key)}`);
        }
        return isFunction(defaultValue) ? defaultValue() : defaultValue;
    }

    return isFunction(value) ? value() : value;
}

// Re-export types that might be useful for users
export type { MatchValue, BaseOptions, WithDefault, WithoutDefault };