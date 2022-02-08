import json, random
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user = random.choice(['a','b','c','d','e','f'])
        print(self.room_name)
        await self.accept()
        #await self.send(json.dumps({"message":"new msg"}))
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        # group send = used to send message to  group 
        await self.channel_layer.group_send(
            self.room_name,
            { # this is the group send dictionary that takes a type and message
            # this is also known as event parameter
            # type = function that self.send() the message
                'type':'welcome_message',
                'message':"A User Joined Chat",
            }
        )

    # this is type function that will send the message 
    # event = dictionary of group_send 
    # it consists of type = function name and other fields that hold data
    # send the event['message'] as there is 'message' in the dict 
    async def welcome_message(self,event):
        await self.send(json.dumps({
            "message":event['message'],
    }))
    

    async def receive(self,text_data):
        text = json.loads(text_data)
        message = text['message'] # recieved data from frontend = text_data
        user = self.user
        notify = text['notify']
        # send it again to frontend by using group_send() and properly parsing it
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type':'chat_message',
                'message':message,
                'user':user,
                'notify':notify
            }
        )
        
    # this is for chat message
    async def chat_message(self,event):
        await self.send(
            json.dumps({
                'message':event['message'],
                'user':event['user'],
                'notify':event['notify']
            })
        )

    async def disconnect(self,code):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type':'disconnect_message',
                'msg':f"{self.user} left the chat"
            }
        )
        await self.close()
    
    async def disconnect_message(self,event):
    # event = dict that is defined in group_send of disconnect_message
    # so we are now sending the event['msg] to the group
        await self.send(
            json.dumps({'message':event['msg']})
        )
