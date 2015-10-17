from django.http import HttpResponse, HttpResponseBadRequest
from .models import Species, Kingdom, Property, Recipe
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers

# species=4&properties=5,6,7,11
class Order:
    def post(request):
        if (request.method == 'POST'):
            species = request.POST.species
            properties = request.POST.properties
            try:
                s = Species.objects.get(id=species)
                p = Property.objects.filter(id__in=properties)
                # external api
                HttpResponse("OK: {0} ({1})".format(s.name, ', '.join(map(lambda i: i.name, p))))
            except ObjectDoesNotExist:
                return HttpResponseBadRequest("Species with the specified ID not found")

            return HttpResponse("")

class SpeciesRest:
    def get_all(request):
        if (request.method == 'GET'):
            all_species = Species.objects.all()
            data = serializers.serialize('json', all_species)
            HttpResponse(data)
        else:
            HttpResponseBadRequest("bad request")

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
