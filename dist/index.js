"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var apollo_server_express_1 = require("apollo-server-express");
var app = express_1["default"]();
app.use(cors_1["default"]());
var schema = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    me: User\n  }\n\n  type User {\n    username: String!\n  }\n"], ["\n  type Query {\n    me: User\n  }\n\n  type User {\n    username: String!\n  }\n"])));
var resolvers = {
    Query: {
        me: function () { return ({ username: 'mkubara' }); }
    }
};
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema,
    resolvers: resolvers
});
server.applyMiddleware({ app: app, path: '/graphql' });
app.listen({ port: 23456 }, function () {
    console.log('server on http://localhost:23456/graphql');
});
var templateObject_1;
//# sourceMappingURL=index.js.map