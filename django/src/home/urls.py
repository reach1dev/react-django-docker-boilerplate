from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from rest_framework import routers
from home.views import EventViewSet
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
router.register(r'events', EventViewSet, base_name='events')
favicon_view = RedirectView.as_view(url='/media/favicon.ico', permanent=True)
logo_view = RedirectView.as_view(url='/media/logo.png', permanent=True)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('search', TemplateView.as_view(template_name='index.html')),
    re_path(r'^event/(?P<id>.*)$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^favicon\.ico$', favicon_view),
    re_path(r'^logo\.png$', logo_view),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('logout', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
