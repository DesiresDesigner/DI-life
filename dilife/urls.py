"""dilife URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from life import rest

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^species$', rest.SpeciesRest.get_all),
    # url(r'^species/(?P<k_id>[0-9]+)$', rest.SpeciesRest.get_by_kingdom),
    url(r'^species/(?P<k_id>\w{0,50})$', rest.SpeciesRest.get_by_kingdom),
    url(r'^properties/(?P<specname>\w{0,50})$', rest.SpeciesRest.get_props_for_spec),
    url(r'^create$', rest.SpeciesRest.get_recent_recipe),
    # url(r'^order/', rest.Order.post),
    url(r'', rest.index),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
