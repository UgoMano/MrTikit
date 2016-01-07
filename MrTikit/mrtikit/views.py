from django.contrib.auth.models import User, Group
from rest_framework import permissions, routers, serializers, viewsets
from serializers import UserSerializer, GroupSerializer

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    required_scopes = []
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer