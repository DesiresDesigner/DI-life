from life.models import Recipe, Property, Protein
__author__ = 'desiresdesigner'

import random


def create(kingdom, species, proplist):
    if kingdom.name == "Bacteria":
        return create_bact(species, proplist)
    elif kingdom.name == "Plant":
        return create_plant(species, proplist)

def create_bact(species, proplist):
    recipe = Recipe()

    recipe.description += "p15TV-L;"
    for prop in proplist:
        if prop.type == "color":
            protein = prop.protein

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += (protein + ";")

    return recipe

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

def create_plant(proplist):
    recipe = Recipe()

    recipe.description += "pGreenII;"

    for prop in proplist:
        if prop.type == "color":
            protein = prop.protein

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += (protein + ";")
        elif prop.type == "smell":
            if prop.name == "hypoallergenic":
                recipe.description += "+RNA interference;"
                #http://www.evrogen.ru/services/RNA-i/service-rna-i.shtml
                continue

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += ("geranylDiphosphateSynthase;")
            recipe.description += ("linaloolSynthase;")
            if prop.name == "rose's smell":
                recipe.description += "R4HEK6 (R4HEK6_SOYBN);"

    return recipe