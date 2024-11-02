# match-ts

A TypeScript implementation of PHP-like pattern matching with type safety and additional features.

## Why I Created This

I've always loved PHP's match expression and have been using my own TypeScript implementation of it for years in various projects. Recently, I wanted to enhance it with a PHP-style `_default` key functionality. After consulting with Claude AI about the implementation, the result turned out so well that I decided to make it my first open-source contribution.

This is my first open-source project, and I'm excited to share it with the community.

## Installation

```bash
npm install match-ts
```

## Usage

```typescript
import { match } from 'match-ts';

// Basic usage with default value
const result1 = match('a', {
    a: 'value1',
    b: 'value2',
    _default: 'default value'
});

// Using with functions
const result2 = match('x', {
    a: () => 'value1',
    _default: () => 'not found'
});

// Without default (all keys required)
const result3 = match('a', {
    a: 'value1',
    b: 'value2'
});

// With specific types
interface User {
    name: string;
    age: number;
}

const userResult = match<string, User>('admin', {
    admin: { name: 'Admin', age: 30 },
    guest: { name: 'Guest', age: 0 },
    _default: { name: 'Unknown', age: -1 }
});
```

## Features

- TypeScript type safety
- PHP-like pattern matching
- Support for both values and functions
- Optional default values with `_default` key
- Generic type support

## Type Safety

The library provides compile-time type checking:
- When using `_default`, other keys are optional
- Without `_default`, all keys are required
- Supports both direct values and functions
- Generic types for flexible usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.