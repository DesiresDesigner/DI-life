from django.http import HttpResponse, HttpResponseBadRequest
from .models import Species, Kingdom, Property, Recipe
from django.template import RequestContext, loader
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers
from django.shortcuts import render


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
    def get_by_kingdom(request, k_id):
        if (request.method == 'GET'):
            all_species = Species.objects.filter(kingdom=k_id)
            data = serializers.serialize('json', all_species)
            return HttpResponse(data)
        else:
            return HttpResponseBadRequest("bad request")

    def get_all(request):
        if (request.method == 'GET'):
            all_species = Species.objects.all()
            data = serializers.serialize('json', all_species)
            return HttpResponse(data)
        else:
            return HttpResponseBadRequest("bad request")
    
    def get_all_with_properties(request):
        if (request.method == 'GET'):
            all_species = Species.objects.all()
            all_properties = Property.objects.all()
            for prop in all_properties:
                prop['properties'][prop.id] = prop.name
            data = serializers.serialize('json', all_species)
            return HttpResponse(data)
        else:
            return HttpResponseBadRequest("bad request")


def index(request):
    return render(request, 'life/index.html',
                  {
                      'fclass': Kingdom.objects.get(id=1),
                      'sclass': Kingdom.objects.get(id=2)})
