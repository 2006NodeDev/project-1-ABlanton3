// set up pub sub topics
import {PubSub} from '@google-cloud/pubsub'

const pubSubClient = new PubSub()


export const userTopic = pubSubClient.topic('projects/tenacious-text-279818/topics/user-service')


