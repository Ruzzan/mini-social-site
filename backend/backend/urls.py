from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.contrib.staticfiles.urls import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Mini Social API",
      default_version='v1',
      description="Official Docs",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[],
   authentication_classes=[],
)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api/',include('posts.urls')),
   path('api/user/',include('users.urls')),
   #docs
   path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('',include('chat.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
