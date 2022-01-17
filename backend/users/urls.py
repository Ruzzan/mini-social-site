from django.urls import path,include
from .views import (UsersListAPI, ProfileAPI, follow_user, UserDetailAPI, UpdateUserAPI,UserSearch)

urlpatterns = [
    path('all/',UsersListAPI.as_view(),name='user-list'),
    path('profile/',ProfileAPI.as_view()),
    path('<int:pk>/',UserDetailAPI),
    path('update/',UpdateUserAPI),
    path('follow/<int:pk>/',follow_user),
    path('search/',UserSearch.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('register/',include('dj_rest_auth.registration.urls')),
]