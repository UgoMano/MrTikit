from django.contrib.auth.models import User, Group
from rest_framework import serializers

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    test_field = serializers.CharField(required=True)

    class Meta:
        model = User

        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'test_field')
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
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group