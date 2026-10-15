
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UsuarioManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, first_name, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico es obligatorio")

        email = self.normalize_email(email)

        usuario = self.model(
            email=email,
            first_name=first_name,
            **extra_fields,
        )

        usuario.set_password(password)
        usuario.save(using=self._db)

        return usuario

    def create_superuser(self, email, first_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("El superusuario debe tener is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("El superusuario debe tener is_superuser=True.")

        return self.create_user(
            email=email,
            first_name=first_name,
            password=password,
            **extra_fields,
        )


class Usuario(AbstractUser):
    username = None

    email = models.EmailField(
        unique=True,
        verbose_name="correo electrónico",
    )

    first_name = models.CharField(
        max_length=150,
        verbose_name="nombre",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name"]

    objects = UsuarioManager()

    def __str__(self):
        return self.email
