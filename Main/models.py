from django.db import models

# Create your models here.

class Kingdom(models.Model):
    name = models.CharField(max_length=200)

class Species(models.Model):
    name = models.CharField(max_length=200)
    kingdom = models.ForeignKey(Kingdom)

class Properties(models.Model):
    name = models.CharField(max_length=200)
    @property
    def kingdom(self):
        return self.species.kingdom
    species = models.ForeignKey(Species)

class Recipes(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    @property
    def kingdom(self):
        return self.species.kingdom
    species = models.ForeignKey(Species)
    properties = models.ManyToManyField(Properties)


