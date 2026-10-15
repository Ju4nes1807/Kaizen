
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import RegistroView


urlpatterns = [
    path("registro/", RegistroView.as_view(), name="registro"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
]
