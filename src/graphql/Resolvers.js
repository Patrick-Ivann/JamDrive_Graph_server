const {
    PubSub,
} = require('graphql-subscriptions');

const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newNotifications';
const notifications = [];

// GraphQL: Resolvers
const RESOLVERS = {
    Query: {
        // notifications: () => notifications,
    },

    Mutation: {
        pushNotification: (root, args) => {
            const newNotification = {
                label: args.label,
            };
            notifications.push(newNotification);

            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, {
                newNotification,
            });


            return newNotification;
        },
    },

    Subscription: {
        newNotification: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC),
        },
    },

};
// Exports
export default RESOLVERS;
