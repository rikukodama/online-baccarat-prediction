import random

deck_file1 = open("deck_file1", "w")
deck_file2 = open("deck_file2", "w")
deck_file3 = open("deck_file3", "w")
deck_file4 = open("deck_file4", "w")
deck_file5 = open("deck_file5", "w")
deck_file6 = open("deck_file6", "w")
deck_file7 = open("deck_file7", "w")
deck_file8 = open("deck_file8", "w")

suit = [1 ,2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

deck = suit + suit + suit + suit

shoe = deck + deck + deck + deck + deck + deck + deck + deck

random.shuffle(shoe)

for x in shoe:
    deck_file1.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file2.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file3.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file4.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file5.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file6.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file7.write(str(x) + "\n")

random.shuffle(shoe)

for x in shoe:
    deck_file8.write(str(x) + "\n")
