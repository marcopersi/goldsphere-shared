"use strict";
/**
 * GoldSphere Shared Library
 *
 * Pure TypeScript library with shared types, Zod schemas, and OpenAPI contracts
 * for the GoldSphere precious metals platform.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOLDSPHERE_SHARED_VERSION = exports.z = void 0;
// Core Types
__exportStar(require("./types/products"), exports);
__exportStar(require("./types/portfolio"), exports);
// Validation Schemas (Zod)
__exportStar(require("./validation/product-schemas"), exports);
__exportStar(require("./validation/portfolio-schemas"), exports);
// API Contracts & Handlers
__exportStar(require("./contracts/product-api"), exports);
__exportStar(require("./contracts/portfolio-api"), exports);
// Utility Re-exports
var zod_1 = require("zod");
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return zod_1.z; } });
// Package Metadata
exports.GOLDSPHERE_SHARED_VERSION = '1.0.0';
//# sourceMappingURL=index.js.map