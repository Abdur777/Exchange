import { RedisClientType, createClient } from "redis";
import { UserManger } from "./UserManager";

export class SubscriptionManager {
    private static instance: SubscriptionManager
    private subscriptions: Map<string, string[]> = new Map();
    private ReverseSubscriptions: Map<string, string[]> = new Map();
    private redisClient: RedisClientType

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }

    subscribe(userId: string, subscription: string){
        if (this.subscriptions.get(userId)?.includes(subscription)) {
            return
        }
        this.subscriptions.set(userId, (this.subscriptions.get(userId) || []).concat(subscription));
        this.ReverseSubscriptions.set(subscription, (this.ReverseSubscriptions.get(subscription) || []).concat(userId));
        if(this.ReverseSubscriptions.get(subscription)?.length===1){
            this.redisClient.subscribe(subscription, this.redisCallBackHandler);
        }
    }

    public unsubscribe(userId: string, subscription: string) {
        const subscriptions = this.subscriptions.get(userId);
        if (subscriptions) {
            this.subscriptions.set(userId, subscriptions.filter(s => s !== subscription));
        }
        const reverseSubscriptions = this.ReverseSubscriptions.get(subscription);
        if (reverseSubscriptions) {
            this.ReverseSubscriptions.set(subscription, reverseSubscriptions.filter(s => s !== userId));
            if (this.ReverseSubscriptions.get(subscription)?.length === 0) {
                this.ReverseSubscriptions.delete(subscription);
                this.redisClient.unsubscribe(subscription);
            }
        }
    }

    public userLeft(userId: string) {
        console.log("user left " + userId);
        this.subscriptions.get(userId)?.forEach(s => this.unsubscribe(userId, s));
    }

    private redisCallBackHandler(message: string, channel: string){
        const parsedMessage = JSON.parse(message);
        this.ReverseSubscriptions.get(channel)?.forEach((e)=>UserManger.getInstance().getUser(e)?.emit(parsedMessage));
    }
}