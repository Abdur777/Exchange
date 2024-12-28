import { createClient } from 'redis'
import { Engine } from './trade/engine';


async function main(){
    const engine = new Engine();
    const redisClient = createClient();
    await redisClient.connect(); 
    console.log("engine hi wjhbef")
    while(true){
        const respone = await redisClient.rPop("messages" as string);
        if(!respone){
            
        }
        else{
            console.log("engine hi")
            engine.process(JSON.parse(respone));
        }
    }
}

main();