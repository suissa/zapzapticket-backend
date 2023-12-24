"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.MessageGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var MessageGateway = /** @class */ (function () {
    function MessageGateway() {
    }
    MessageGateway.prototype.handleMessage = function (data) {
        // Lógica para lidar com a mensagem recebida
        this.server.emit('response-event', { /* dados de resposta */});
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], MessageGateway.prototype, "server");
    __decorate([
        (0, websockets_1.SubscribeMessage)('your-message-event'),
        __param(0, (0, websockets_1.MessageBody)())
    ], MessageGateway.prototype, "handleMessage");
    MessageGateway = __decorate([
        (0, websockets_1.WebSocketGateway)({ /* opcionalmente, configurações como a porta */})
    ], MessageGateway);
    return MessageGateway;
}());
exports.MessageGateway = MessageGateway;
