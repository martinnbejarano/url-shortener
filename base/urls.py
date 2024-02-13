from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ShortURL, Register

urlpatterns = [
    path('register/', Register.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('shortened-urls/', view = ShortURL.as_view()),
]


# 1) get short urls (publico)  LISTO
# 2) post short urls (privado y publico?) LISTO
# 3) get original url (publico) s/shortened-url/

# 6) dashboard urls para modificar o ver estadisticas (privado). Se usa el get 1)
 