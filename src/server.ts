class MultiMessage {
	private static instances: Map<string,MultiMessage> = new Map();//session id and array of strings - guids

	private array: string[];
	private constructor(){
		this.array = [];
	}
	public static getInstance(sessionId: string): MultiMessage{
		const multiMessage = MultiMessage.instances.get(sessionId);
		//console.log(multiMessage);
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
	public addToArray(userId: string){
		this.array.push(userId);
	}
}

const port = process.env.PORT||3000;

import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.post('/toAdd', (req: any, res: any) => {
	//res.sendFile(path.join(__dirname + '/../public/index2.html'));
	let sessionId = req.body['sessionId'];
	let message = MultiMessage.getInstance(sessionId).getArray();
	//console.log("message: ",message);
	res.json({toAdd: message})
});

app.use(express.static('public'));

app.post('/add', (req, res) => {
	//nothing
	let sessionId = req.body['sessionId'];
	let userId = req.body['userId'];
	//console.log('userId: ',userId,", sessionId: ",sessionId);
	//console.log(req.body);
	MultiMessage.getInstance(sessionId).addToArray(userId);
	res.send("thank you.")
});

app.listen(port, () => {
	//console.log(`Example app listening at http://localhost:${port}`);
});

