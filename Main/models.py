from django.db import models

# Create your models here.

class Class(models.Model):
    name = models.CharField(max_length=200)

class Subclass(models.Model):
    name = models.CharField(max_length=200)
    cls = models.ForeignKey(Class)

class Properties(models.Model):
    name = models.CharField(max_length=200)
    @property
    def cls(self):
        return self.subclass.cls
    subclass = models.ForeignKey(Subclass)

class Recipes(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    @property
    def cls(self):
        return self.subclass.cls
    subclass = models.ForeignKey(Subclass)
    properties = models.ManyToManyField(Properties)


