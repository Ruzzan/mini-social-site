from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.contrib.staticfiles.urls import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('posts.urls')),
    path('api/user/',include('users.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
