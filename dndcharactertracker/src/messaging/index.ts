import {PubSub} from '@google-cloud/pubsub'

const pubSubClient = new PubSub()


export const userTopic = pubSubClient.topic('projects/enhanced-hawk-279818/topics/user-service')


