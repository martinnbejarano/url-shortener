from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserURL, Register, ShortURL

urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('shortened-urls/', view = UserURL.as_view()),
    path('s/<str:short_url>', view = ShortURL.as_view())
]

