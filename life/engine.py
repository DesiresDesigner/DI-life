from life.models import Recipe, Property, Protein
__author__ = 'desiresdesigner'

import random


def create(kingdom, species, proplist):
    if kingdom.name == "Bacteria":
        return create_bact(species, proplist)
    elif kingdom.name == "Plant":
        return create_plant(species, proplist)

def create_bact(species, proplist):
    pass

restriction_sites = ["HpaI",
		"FspI",
		"KpnI",
		"ApaI",
		"XhoI",
		"SalI",
		"ClaI",
		"HindIII",
		"EcoRV",
		"EcoRI",
		"PstI",
		"SmaI",
		"XmaI",
		"BamHI",
		"SpeI",
		"XbaI",
		"NotI",
		"SacII",
		"SacI",
		"StuI",
		"ApaLI",
		"NruI"]

def create_plant(species, proplist):
    recipe = Recipe()

    for prop in proplist:
        recipe.properties.add(prop)
        recipe.description += "pGreenII;"

        if prop.type == "color":
            protein = prop.protein

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += (protein.name + ";")
        elif prop.type == "smell":
            pass