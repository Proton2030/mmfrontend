declare module 'react-native-crypto' {
  import { Buffer } from 'buffer';
  export { Buffer };
  export function createCipheriv(
    algorithm: string,
    key: Buffer,
    iv: Buffer,
  ): {
    update: (data: string, inputEncoding?: string, outputEncoding?: string) => string;
    final: (outputEncoding?: string) => string;
  };

  export function createDecipheriv(
    algorithm: string,
    key: Buffer,
    iv: Buffer,
  ): {
    update: (data: string, inputEncoding?: string, outputEncoding?: string) => string;
    final: (outputEncoding?: string) => string;
  };

  export function randomBytes(size: number): Buffer;
}
