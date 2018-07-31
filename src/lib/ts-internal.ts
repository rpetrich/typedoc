import * as ts from 'typescript';
const tsany = ts as any;

/**
 * Expose the internal TypeScript APIs that are used by TypeDoc
 */
declare module 'typescript' {
  interface Symbol {
    // https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L2658
    id?: number;
    // https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L2660
    parent?: ts.Symbol;
  }

  interface Node {
    // https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L497
    symbol?: ts.Symbol;
    // https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L500
    localSymbol?: ts.Symbol;
    // https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L499
    nextContainer?: ts.Node;
  }
}

function stealInternal(name: string): any {
  if (Object.prototype.hasOwnProperty.call(tsany, name)) {
    return tsany[name];
  }
  throw new TypeError(`Imported typescript module does not have a ${name} property`);
}

/**
 * These functions are in 'core' and are marked as @internal:
 * https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L9-L10
 */

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L1133-LL1134
export const createCompilerDiagnostic: (message: ts.DiagnosticMessage, ...args: (string | number)[]) => ts.Diagnostic = stealInternal('createCompilerDiagnostic');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L1191
export const compareValues: <T>(a: T, b: T) => number = stealInternal('compareValues'); // Actually returns a ts.Comparison which is also internal

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L1281
export const normalizeSlashes: (path: string) => string = stealInternal('normalizeSlashes');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L1288
export const getRootLength: (path: string) => number = stealInternal('getRootLength');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/core.ts#L1368-L1370
export const getDirectoryPath: ((path: ts.Path) => ts.Path) & ((path: string) => string) = stealInternal('getDirectoryPath');

// https://github.com/Microsoft/TypeScript/blob/v2.2.1/src/compiler/core.ts#L1418
export const normalizePath: (path: string) => string = stealInternal('normalizePath');

// https://github.com/Microsoft/TypeScript/blob/v2.2.1/src/compiler/core.ts#L1628
export const combinePaths: (path1: string, path2: string) => string = stealInternal('combinePaths');

/**
 * These functions are in 'utilities' and are marked as @internal:
 * https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L3-L4
 */

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L152
export const getSourceFileOfNode: (node: ts.Node) => ts.SourceFile = stealInternal('getSourceFileOfNode');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L301
export const getTextOfNode: (node: ts.Node, includeTrivia?: boolean) => string = stealInternal('getTextOfNode');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L473
export const declarationNameToString: (name: ts.DeclarationName) => string = stealInternal('declarationNameToString');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L1423
export const getJSDocCommentRanges: (node: ts.Node, text: string) => any = stealInternal('getJSDocCommentRanges');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L3738
export const isBindingPattern: (node: ts.Node) => node is ts.BindingPattern = stealInternal('isBindingPattern');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L1729
export const getEffectiveBaseTypeNode: (node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration) => any =
  stealInternal('getEffectiveBaseTypeNode');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L1734
export const getClassImplementsHeritageClauseElements: (node: ts.ClassLikeDeclaration) => any = stealInternal('getClassImplementsHeritageClauseElements');

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L1739
export const getInterfaceBaseTypeNodes: (node: ts.InterfaceDeclaration) => any = stealInternal('getInterfaceBaseTypeNodes');

/**
 * https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L3347
 * This is large enum of char codes.
 *
 * Faking the enum as a var (only certain codes are used by TypeDoc)
 */
export const CharacterCodes: {
  [key: string]: number;
  doubleQuote: number;
  space: number;
  minus: number;
  at: number;
} = tsany.CharacterCodes;

export const optionDeclarations: CommandLineOption[] = stealInternal('optionDeclarations');

/**
 * Command line options
 *
 * https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/types.ts#L3344
 */
export interface CommandLineOption {
  name: string;
  type: string;
  shortName: string;
  description: DiagnosticsEnumValue;
  paramType: DiagnosticsEnumValue;
}

// tslint:disable-next-line:variable-name
export const Diagnostics: {
  [key: string]: DiagnosticsEnumValue;
  FILE: DiagnosticsEnumValue;
  DIRECTORY: DiagnosticsEnumValue;
} = stealInternal('Diagnostics');

export interface DiagnosticsEnumValue {
  code: number;
  category: ts.DiagnosticCategory;
  key: string;
  message: string;
}
