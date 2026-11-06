from rest_framework.routers import DefaultRouter
from .views import ProveedorViewSet, ArticuloViewSet

router = DefaultRouter()
router.register("proveedores", ProveedorViewSet)
router.register("articulos", ArticuloViewSet)

urlpatterns = router.urls
