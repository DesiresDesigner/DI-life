from life.models import Recipe, Property
from Bio import SeqIO
from Bio.Seq import Seq

__author__ = 'desiresdesigner'


def create(kingdom, species, proplist):
    if kingdom.name == "Bacteries":
        return create_bact(species, proplist)
    elif kingdom.name == "Plants":
        return create_plant(species, proplist)

def create_bact(species, proplist):
    pass


def get_seq(prop):
    pass


def cut(plazmid):
    pass


def prepare_injectable(prop_seq):
    pass


def inject(injectable, cutted):
    pass


def legate(plazmid):
    pass


def create_plant(species, proplist):
    plazmid = Seq()
    recipe = Recipe()

    for prop in proplist:
        recipe.properties.add(prop)
        prop_seq = get_seq(prop)


        if prop.type == "color":
            cutted = cut(plazmid)
            injectable = prepare_injectable(prop_seq)
            plazmid = inject(injectable, cutted)
            legate(plazmid)
