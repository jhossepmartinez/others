from .serializers import UsersSerializer
from rest_framework import viewsets
from .models import Users


class UsersViewSet(viewsets.ModelViewSet):
    lookup_field = "username"  # You can change the field to look when searching
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
