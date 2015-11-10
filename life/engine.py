from life.models import Recipe, Property
__author__ = 'desiresdesigner'

import random


def create(kingdom, species, proplist):
    if kingdom == "Bacteria":
        return create_bact(species, proplist)
    elif kingdom == "Plant":
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

def create_plant(species, proplist):
    recipe = Recipe()

    recipe.description += "pGreenII;"

    for prop in proplist:
        prs = Property.objects.filter(name=prop)
        pr = prs[0]

        if pr.type == "color":
            protein = pr.protein

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += (protein + ";")
        elif pr.type == "smell":
            if pr.name == "hypoallergenic":
                recipe.description += "+RNA interference;"
                #http://www.evrogen.ru/services/RNA-i/service-rna-i.shtml
                continue

            recipe.description += (random.choice(restriction_sites) + ";")
            recipe.description += ("geranylDiphosphateSynthase;")
            recipe.description += ("linaloolSynthase;")
            if pr.name == "rose's smell":
                recipe.description += "R4HEK6 (R4HEK6_SOYBN);"

    return recipe