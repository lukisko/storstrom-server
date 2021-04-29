"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class MultiMessage {
    constructor() {
        this.array = [];
    }
    static getInstance(sessionId) {
        const multiMessage = MultiMessage.instances.get(sessionId);
        //console.log(multiMessage);
        if (multiMessage) {
            return multiMessage;
        }
        else {
            const multi = new MultiMessage();
            this.instances.set(sessionId, multi);
            return multi;
        }
    }
    getArray() {
        let arr = this.array;
        this.array = [];
        return arr;
    }
    addToArray(userId) {
        this.array.push(userId);
    }
}
MultiMessage.instances = new Map(); //session id and array of strings - guids
const port = process.env.PORT || 3000;
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.post('/toAdd', (req, res) => {
    //res.sendFile(path.join(__dirname + '/../public/index2.html'));
    let sessionId = req.body['sessionId'];
    let message = MultiMessage.getInstance(sessionId).getArray();
    //console.log("message: ",message);
    res.json({ toAdd: message });
});
app.use(express_1.default.static('public'));
app.post('/add', (req, res) => {
    //nothing
    let sessionId = req.body['sessionId'];
    let userId = req.body['userId'];
    //console.log('userId: ',userId,", sessionId: ",sessionId);
    //console.log(req.body);
    MultiMessage.getInstance(sessionId).addToArray(userId);
    res.send("thank you.");
});
app.listen(port, () => {
    //console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map