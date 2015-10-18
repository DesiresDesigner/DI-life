from django.db import models

# Create your models here.

class Kingdom(models.Model):
    name = models.CharField(max_length=200)


class Species(models.Model):
    name = models.CharField(max_length=200)
    friendly_name = models.CharField(max_length=200, null=True)
    kingdom = models.ForeignKey(Kingdom)


class Property(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100)

    @property
    def kingdom(self):
        return self.species.kingdom

    species = models.ForeignKey(Species)


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)

    @property
    def kingdom(self):
        return self.species.kingdom

    species = models.ForeignKey(Species)
    properties = models.ManyToManyField(Property)
