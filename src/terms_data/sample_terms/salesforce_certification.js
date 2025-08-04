const salesforce_experience = [

    // Learning how to do Salesforce API Terminologies
    {
        "term": "Salesforce API terms | Events",
        "description": "Event refers to the creation, update, delete, or undelete of a record in Salesforce. Each event can trigger a notification that is sent to a channel to which one or more clients are subscribed.",
        "prompt": "What is an event in Salesforce? When is it triggered?",
        "example": "If a new account is created in Salesforce, it can trigger an event which can then notify the appropriate team via a notification."
    },
    {
        "term": "Salesforce API terms | Notifications",
        "description": "Notification in Salesforce is a message that is sent to a channel in response to an event. The channel is subscribed by one or more clients. Notifications can be sent via email, Chatter, or other means.",
        "prompt": "What is a notification in Salesforce? When is it triggered?",
        "example": "If a new opportunity is created in Salesforce, it can trigger a notification that can be sent to the sales team via email, informing them about the new opportunity."
    },
    {
        "term": "Salesforce API terms | PushTopics",
        "description": "PushTopic in Salesforce is used to trigger notifications for changes in Salesforce records resulting from a create, update, delete, or undelete operation. PushTopic notification is based on the criteria defined in the PushTopic record and the SOQL query specified. The PushTopic defines a subscription channel.",
        "prompt": "What is a PushTopic in Salesforce? When is it triggered?",
        "example": "If a new account is created in Salesforce and a PushTopic is configured to notify the sales team about new accounts, then a notification will be sent to the sales team channel with the details of the new account."
    },
    {
        "term": "Salesforce API terms | Channel",
        "description": "A channel in Salesforce is a stream of events to which a client can subscribe to receive event notifications. A channel can be subscribed by one or more clients, and notifications are sent to all the subscribed clients.",
        "prompt": "What is a channel in Salesforce? When is it triggered?",
        "example": "If a new opportunity is created in Salesforce, it can trigger an event that is sent to a channel subscribed by the sales team, notifying them about the new opportunity."
    },
    {
        "term": "Salesforce API terms | Event Bus",
        "description": "An event bus in Salesforce is a conduit through which a publisher sends an event notification. Event subscribers can subscribe to a channel in the event bus to receive event notifications. The event bus supports replaying stored event messages, which means that subscribers can retrieve messages that they missed during a downtime.",
        "prompt": "What is an event bus in Salesforce? When is it triggered?",
        "example": "If a new case is created in Salesforce, it can trigger an event that is sent to an event bus. The customer support team can subscribe to the event bus channel to receive notifications about new cases."
    },
    {
        "term": "Salesforce API terms | Platform Event",
        "description": "A platform event in Salesforce is an entity that represents the definition of the custom data that you send in a platform event message. You create a platform event and define its fields in Salesforce. The subscription channel is based on the platform event name, and notifications are sent to all the subscribed clients.",
        "prompt": "What is a platform event in Salesforce? When is it triggered?",
        "example": "If a new lead is created in Salesforce, it can trigger a platform event that is sent to a channel subscribed by the sales team, notifying them about the new lead."
    },
    {
        "term": "Salesforce API terms | Change Data Capture Event",
        "description": "Change Data Capture event in Salesforce is similar to a PushTopic, and it triggers notifications for changes in Salesforce records resulting from a create,\n\
        update, delete, or undelete operation. Unlike a PushTopic, Change Data Capture sends all changed fields of a record and doesn't require you to specify the fields in a query.\n\
        Also, Change Data Capture sends information about the change in headers.",
        "prompt": "What is a Change Data Capture Event in Salesforce? When is it triggered?",
        "example": "If a contact's phone number is updated in Salesforce, it can trigger a Change Data Capture event that sends all the changed fields of the contact record to a channel \n\
        subscribed by the customer support team, allowing them to update their records."
    },
    {
        "term": "CometD | Receiving Events",
        "description": "If a client receives events, it must reconnect immediately using CometD to receive the next set of events. If the reconnection doesn't occur within 40 seconds, the server expires the subscription, \
        and the connection closes. The client must start over with a handshake and subscribe again using the custom /meta/handshake channel listener.",
        "prompt": "What should a client do after receiving events in CometD?",
        "example": "If a client receives a notification about a new account in Salesforce via CometD, it must immediately reconnect using CometD to receive the next set of events within 40 seconds."
    },
    {
        "term": "CometD | No Events Received",
        "description": ":m If no events are generated while the client is waiting, and the server closes the connection, CometD must reconnect within 110 seconds. The Bayeux server sends a response to the client that contains the reconnect \
        deadline of 110 seconds in the advice field. If the client doesn't reconnect within the expected time, the server removes the client's CometD session.",
        "prompt": "What should a client do when no events are received in CometD?",
        "example": ":m If no events are generated while a client is waiting for notifications about new cases in Salesforce via CometD, and the server closes the connection, CometD must reconnect within `110` seconds."
    },
    {
        "term": "CometD | Network Failure",
        "description": "If a long-lived connection is lost due to unexpected network disruption, CometD attempts to reconnect. If this reconnection is successful, clients must resubscribe because this new connection has gone through \
        a rehandshake that removes previous subscribers. Clients can listen to the /meta/handshake meta channel to receive notifications when a connection is lost and reestablished.",
        "prompt": "What should a client do after a network failure in CometD?",
        "example": ":m If a client's connection to the Salesforce server is lost `due to a network disruption`, CometD attempts to reconnect. Once the reconnection is successful, the `client` must `resubscribe to receive notifications`\
         about new leads."
    },
    {
        "term": "CometD | Invalid Authentication",
        "description": "If client authentication is not valid, the client is notified with the 401::Authentication invalid error and an advice field containing reconnect=none. After receiving the error notification in the channel listener,\
         the client must reauthenticate and reconnect to receive new events.",
        "prompt": "What should a client do after invalid authentication in CometD?",
        "example": ":m If a client's authentication becomes invalid due to an `OAuth token revocation or a Salesforce session invalidation` by an admin, CometD notifies the client with the `401::Authentication invalid error` and an advice field\
         containing reconnect=none. The client must then `reauthenticate` and reconnect to receive new notifications."
    },

]


module.exports = { salesforce_experience }

