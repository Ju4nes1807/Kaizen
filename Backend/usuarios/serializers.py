
from django.contrib.auth import get_user_model
from rest_framework import serializers


Usuario = get_user_model()


class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    class Meta:
        model = Usuario
        fields = ["id", "first_name", "email", "password"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop("password")

        usuario = Usuario.objects.create_user(
            password=password,
            **validated_data,
        )

        return usuario
