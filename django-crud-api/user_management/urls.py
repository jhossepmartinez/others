from django.urls import path, include
from rest_framework import routers
from .viewsets import UsersViewSet

router = routers.DefaultRouter()

router.register(r"users", UsersViewSet)


urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("", include(router.urls)),
]
