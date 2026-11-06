from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from django.db.models import ProtectedError
from .models import Proveedor, Articulo
from .serializers import ProveedorSerializer, ArticuloSerializer


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all().order_by("codigo")
    serializer_class = ProveedorSerializer

    def perform_destroy(self, instance):
        try:
            instance.delete()
        except ProtectedError:
            raise ValidationError("no se puede eliminar: el proveedor tiene articulos")


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.select_related("proveedor").order_by("codigo")
    serializer_class = ArticuloSerializer
