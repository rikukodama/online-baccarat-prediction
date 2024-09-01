import random

deck_file = open("deck_file", "w")

suit = [1 ,2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

deck = suit + suit + suit + suit

shoe = deck + deck + deck + deck + deck + deck + deck + deck

random.shuffle(shoe)

for x in shoe:
    deck_file.write(str(x) + "\n")
