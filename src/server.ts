class MultiMessage {
	private static instances: Map<string,MultiMessage> = new Map();//session id and array of strings - guids

	private array: Array<{userName: string; userIp: string}>;
	private constructor(){
		this.array = [];
	}
	public static getInstance(sessionId: string): MultiMessage{
		const multiMessage = MultiMessage.instances.get(sessionId);
		//console.log(sessionId);
		//console.log(this.instances, multiMessage);
		if (multiMessage){
			return multiMessage;
		} else {
			const multi = new MultiMessage();
			this.instances.set(sessionId,multi);
			return multi;
		}
	}
	public getArray(){
		let arr = this.array;
		this.array = [];
		return arr;
	}
	public addToArray(userIp: string, userName: string){
		this.array.push({
            userName: userName,
            userIp: userIp
        });
		//console.log(this.array);
	}
}

const port = process.env.PORT||3001;

import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.post('/toAdd', (req: any, res: any) => {
	//console.log('******************removing');
	//res.sendFile(path.join(__dirname + '/../public/index2.html'));
	let sessionId = req.body['sessionId'];
	let message = MultiMessage.getInstance(sessionId).getArray();
	//console.log("message: ",message);
	res.json({toAdd: message})
});

app.use(express.static('public'));

app.post('/add', (req, res) => {
	//nothing
	//console.log('****************adding');
	let sessionId = req.body['sessionId'];
    let userName = req.body['userName'];
    let userIp = req.body['userIp'];
	//console.log('userIp: ',userIp,", sessionId: ",sessionId);
	//console.log(req.body);
	MultiMessage.getInstance(sessionId).addToArray(userIp, userName);
	res.send("thank you.")
});

app.listen(port, () => {
	//console.log(`Example app listening at http://localhost:${port}`);
});

