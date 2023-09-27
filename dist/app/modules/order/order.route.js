"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(client_1.UserRole.customer), order_controller_1.OrderController.createOrderController);
router.get('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.customer), order_controller_1.OrderController.getAllOrdersController);
router.get('/:orderId', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.customer), order_controller_1.OrderController.getSingleOrderController);
exports.OrderRoutes = router;
