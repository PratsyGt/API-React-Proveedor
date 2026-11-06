from django.db import models


class Proveedor(models.Model):
    codigo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    domicilio = models.CharField(max_length=150, blank=True)
    poblacion = models.CharField(max_length=100, blank=True)
    cpostal = models.CharField(max_length=10, blank=True)
    provincia = models.CharField(max_length=100, blank=True)
    tfno = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        verbose_name_plural = "proveedores"

    def __str__(self):
        return self.nombre


class Articulo(models.Model):
    codigo = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=200)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    ubicacion = models.CharField(max_length=100, blank=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.PROTECT, related_name="articulos")
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = "articulos"

    def __str__(self):
        return self.descripcion
