"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORTFOLIO_API_ENDPOINTS = void 0;
/**
 * OpenAPI endpoint mappings
 * Maps OpenAPI paths to TypeScript types
 */
exports.PORTFOLIO_API_ENDPOINTS = {
    GET_POSITIONS: '/positions',
    GET_POSITION_BY_ID: '/positions/{positionId}',
    CREATE_POSITION: '/positions',
    UPDATE_POSITION: '/positions/{positionId}',
    CLOSE_POSITION: '/positions/{positionId}',
    GET_TRANSACTIONS: '/transactions',
    GET_TRANSACTION_BY_ID: '/transactions/{transactionId}',
    RECORD_TRANSACTION: '/transactions',
    GET_PORTFOLIO_SUMMARY: '/portfolio/summary',
};
//# sourceMappingURL=portfolio-api.js.map