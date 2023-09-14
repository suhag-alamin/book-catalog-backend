"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // create the initial order
        const initialOrder = yield transactionClient.order.create({
            data: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
        // create ordered books and associate them with the order
        const orderedBooks = yield Promise.all(data.orderedBooks.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            const newOrderedBook = yield transactionClient.orderedBook.create({
                data: {
                    quantity: order.quantity,
                    bookId: order.bookId,
                    orderId: initialOrder.id,
                },
            });
            return newOrderedBook;
        })));
        // update the order with the associated orderedBooks
        const updatedOrder = yield transactionClient.order.update({
            where: {
                id: initialOrder.id,
            },
            data: {
                orderedBooks: {
                    connect: orderedBooks.map(book => ({
                        id: book.id,
                    })),
                },
            },
        });
        return updatedOrder;
    }));
    if (newOrder) {
        const responseData = yield prisma_1.default.order.findUnique({
            where: {
                id: newOrder === null || newOrder === void 0 ? void 0 : newOrder.id,
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.UserRole.CUSTOMER) {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getSingleOrder = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.UserRole.CUSTOMER) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id: orderId,
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
