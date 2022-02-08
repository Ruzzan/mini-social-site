from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/',ChatConsumer.as_asgi()),
   # path('ws/notification/<str:room_name>/',NotificationConsumer.as_asgi()),
]