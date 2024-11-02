import { match } from '../src';

describe('match function', () => {
    it('should match direct values', () => {
        const result = match('a', {
            a: 'value1',
            b: 'value2',
            _default: 'default'
        });
        expect(result).toBe('value1');
    });

    it('should use default when key not found', () => {
        const result = match('c', {
            a: 'value1',
            b: 'value2',
            _default: 'default'
        });
        expect(result).toBe('default');
    });

    it('should handle function values', () => {
        const result = match('a', {
            a: () => 'value1',
            b: () => 'value2',
            _default: () => 'default'
        });
        expect(result).toBe('value1');
    });

    it('should work with mixed value types', () => {
        const result = match('b', {
            a: 'value1',
            b: () => 'value2',
            _default: 'default'
        });
        expect(result).toBe('value2');
    });

    it('should work with complex types', () => {
        interface User {
            name: string;
            age: number;
        }

        const result = match<string, User>('admin', {
            admin: { name: 'Admin', age: 30 },
            guest: { name: 'Guest', age: 0 },
            _default: { name: 'Unknown', age: -1 }
        });

        expect(result).toEqual({ name: 'Admin', age: 30 });
    });

    it('should require all keys when no default is provided', () => {
        const result = match('a', {
            a: 'value1',
            b: 'value2'
        });
        expect(result).toBe('value1');
    });
});