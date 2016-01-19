from django.contrib.auth.models import User, Group
from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from models import *
from django.contrib.auth.hashers import make_password

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    #test_field = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)

        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class UserProfileSerializer:
    class Meta:
        model = UserProfile

class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(required=False)
    fb_token = serializers.CharField(source='userprofile.fb_token', required=False)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name", 
            "last_name", 
            "password", 
            "last_login", 
            "is_superuser", 
            "username", 
            "is_staff", 
            "is_active", 
            "date_joined",
            "groups",
            "user_permissions",
            "fb_token"
        )

    ''' 
    def validate(self, data):
        # Making sure the username always matches the email
        email = data.get('email', None)
        if email:
            data['username'] = email

        return data
    '''
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', None)
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            if attr == 'password':
                setattr(instance, attr, make_password(value))
            else:
                setattr(instance, attr, value)
        instance.save()

        if password:
            instance.set_password(password)
            instance.save()
            update_session_auth_hash(self.context.get('request'), instance)

        if profile_data:
            if not instance.userprofile:
                UserProfile.objects.create(user=instance, **profile_data)
            instance.userprofile.fb_token = profile_data.get('fb_token', instance.userprofile.fb_token)
            instance.userprofile.save()

        return instance
       
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group