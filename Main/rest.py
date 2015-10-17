from django.http import HttpResponse, HttpResponseBadRequest
from .models import Species, Kingdom, Properties, Recipes
from django.core.exceptions import ObjectDoesNotExist
# species, properties
class Order:
    def post(request):
        if (request.method == 'POST'):
            species = request.POST.species
            try:
                s = Species.objects.get(id=species)
                p = Properties.objects.filter(id__in())
            except ObjectDoesNotExist:
                return HttpResponseBadRequest("Species with the specified ID not found")

            return HttpResponse("")

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
