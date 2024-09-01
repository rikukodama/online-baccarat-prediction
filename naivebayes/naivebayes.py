import numpy as np

trainingfile = open("trainingdata.txt", "r")

testingBanker = open("testingdataBanker.txt", "r")

testingPlayer = open("testingdataPlayer.txt", "r")

testingTie = open("testingdataTie.txt", "r")

trainingdata = []
trainingdataLabels = []

testingdata = []
testingdataLabels = []

probs0 = {}

total0 = 0

probs1 = {}

total1 = 0

probs2 = {}

total2 = 0

predict = 0

b = []

p = []

for x in trainingfile:

    bankerCards = []
    playerCards = []

    myarray = list(map(float, x.split()))
    label = myarray.pop()


    numPlayerCardsDrawn = myarray[10];
    numBankerCardsDrawn = myarray[11];
    for x in range(int(numBankerCardsDrawn)):
        card = myarray.pop()
        bankerCards.append(card)

    for x in range(int(numPlayerCardsDrawn)):
        card = myarray.pop()
        playerCards.append(card)

    bankerCards.sort()
    playerCards.sort()

    b.append(bankerCards)
    p.append(playerCards)

    trainingdata.append(myarray)
    trainingdataLabels.append(label)


    if label == 0:
        i = 0
        total0 += 1
        for y in myarray:
            round(y, 5)
            try:
                probs0[i][y] += 1
            except KeyError:
                try:
                    probs0[i][y] = 1
                except KeyError:
                    probs0[i] = {}
                    probs0[i][y] = 1
            i += 1
        try:
            probs0[i][repr(playerCards)] += 1
        except KeyError:
            try:
                probs0[i][repr(playerCards)] = 1
            except KeyError:
                probs0[i] = {}
                probs0[i][repr(playerCards)] = 1
        i += 1
        try:
            probs0[i][repr(bankerCards)] += 1
        except KeyError:
            try:
                probs0[i][repr(bankerCards)] = 1
            except KeyError:
                probs0[i] = {}
                probs0[i][repr(bankerCards)] = 1

    elif label == 1:
        i = 0
        total1 += 1
        for y in myarray:
            round(y, 5)
            try:
                probs1[i][y] += 1
            except KeyError:
                try:
                    probs1[i][y] = 1
                except KeyError:
                    probs1[i] = {}
                    probs1[i][y] = 1
            i += 1
        try:
            probs1[i][repr(playerCards)] += 1
        except KeyError:
            try:
                probs1[i][repr(playerCards)] = 1
            except KeyError:
                probs1[i] = {}
                probs1[i][repr(playerCards)] = 1
        i += 1
        try:
            probs1[i][repr(bankerCards)] += 1
        except KeyError:
            try:
                probs1[i][repr(bankerCards)] = 1
            except KeyError:
                probs1[i] = {}
                probs1[i][repr(bankerCards)] = 1

    elif label == 2:
        i = 0
        total2 += 1
        for y in myarray:
            round(y, 5)
            try:
                probs2[i][y] += 1
            except KeyError:
                try:
                    probs2[i][y] = 1
                except KeyError:
                    probs2[i] = {}
                    probs2[i][y] = 1
            i += 1
        try:
            probs2[i][repr(playerCards)] += 1
        except KeyError:
            try:
                probs2[i][repr(playerCards)] = 1
            except KeyError:
                probs2[i] = {}
                probs2[i][repr(playerCards)] = 1
        i += 1
        try:
            probs2[i][repr(bankerCards)] += 1
        except KeyError:
            try:
                probs2[i][repr(bankerCards)] = 1
            except KeyError:
                probs2[i] = {}
                probs2[i][repr(bankerCards)] = 1

#print(probs0)
#print(total0)
#print(probs1)
#print(total1)




correct = 0
total = 0

for x,label in zip(trainingdata, trainingdataLabels):
    numerator2 = 1.0
    numerator1 = 1.0
    numerator0 = 1.0
    denom = 1.0
    i = 0
    for y in x:

        probs0val = 1.0
        try:
            probs0val = (probs0[i][y]) + 1
        except KeyError:
            probs0val = 1.0

        probs1val = 1.0
        try:
            probs1val = (probs1[i][y]) + 1
        except KeyError:
            probs1val = 1.0


        probs2val = 1.0
        try:
            probs2val = (probs2[i][y]) + 1
        except KeyError:
            probs2val = 1.0

        #print(int(probs0val))
        #print(int(probs1val))
        numerator2 *= probs2val
        numerator2 /= total2

        numerator1 *= probs1val
        numerator1 /= total1

        numerator0 *= probs0val
        numerator0 /= total0

        denom *= (probs2val+probs1val+probs0val) / (total2 + total1 + total0)
        i += 1

    bankerCards = b.pop(0)
    playerCards = p.pop(0)
    try:
        numerator2 *= probs2[i][repr(playerCards)] + 1
    except KeyError:
        numerator2 *= 1

    numerator2 /= total2
    try:
        numerator1 *= probs1[i][repr(playerCards)] + 1
    except KeyError:
        numerator1 *= 1
    numerator1 /= total1

    try:
        numerator0 *= probs0[i][repr(playerCards)] + 1
    except KeyError:
        numerator0 *= 1
    numerator0 /= total0

    i += 1

    try:
        numerator2 *= probs2[i][repr(bankerCards)] + 1
    except KeyError:
        numerator2 *= 1
    numerator2 /= total2

    try:
        numerator1 *= probs1[i][repr(bankerCards)] + 1
    except KeyError:
        numerator1 *= 1
    numerator1 /= total1

    try:
        numerator0 *= probs0[i][repr(bankerCards)] + 1
    except KeyError:
        numerator0 *= 1
    numerator0 /= total0

    numerator2 *= total2 / (total2 + total1 + total0)
    numerator1 *= total1 / (total2 + total1 + total0)
    numerator0 *= total0 / (total2 + total1 + total0)
    numerator2 /= denom
    numerator1 /= denom
    numerator0 /= denom

    if max([numerator0, numerator1, numerator2]) == numerator0:
        predict = 0
    elif max([numerator0, numerator1, numerator2]) == numerator1:
        predict = 1
    else:
        if max([numerator0, numerator1]) == numerator0:
            predict = 0
        else:
            predict = 1

    if label == 2:
        correct += 1
        total += 1
    elif label == predict:
        correct += 1
        total += 1
    else:
        total += 1
    # if predict != 2:
    #     if label == 2:
    #         correct += 1
    #         total += 1
    #     elif label == predict:
    #         correct += 1
    #         total += 1
    #     else:
    #         total += 1

print(correct)
print(total)
print(float(correct)/float(total))

b = []
p = []

for x in testingBanker:
    bankerCards = []
    playerCards = []

    myarray = list(map(float, x.split()))
    label = myarray.pop()

    numPlayerCardsDrawn = myarray[10];
    numBankerCardsDrawn = myarray[11];
    for x in range(int(numBankerCardsDrawn)):
        card = myarray.pop()
        bankerCards.append(card)

    for x in range(int(numPlayerCardsDrawn)):
        card = myarray.pop()
        playerCards.append(card)

    bankerCards.sort()
    playerCards.sort()

    b.append(bankerCards)
    p.append(playerCards)

    testingdata.append(myarray)
    testingdataLabels.append(label)

for x in testingPlayer:
    bankerCards = []
    playerCards = []

    myarray = list(map(float, x.split()))
    label = myarray.pop()


    numPlayerCardsDrawn = myarray[10];
    numBankerCardsDrawn = myarray[11];
    for x in range(int(numBankerCardsDrawn)):
        card = myarray.pop()
        bankerCards.append(card)

    for x in range(int(numPlayerCardsDrawn)):
        card = myarray.pop()
        playerCards.append(card)

    bankerCards.sort()
    playerCards.sort()

    b.append(bankerCards)
    p.append(playerCards)

    testingdata.append(myarray)
    testingdataLabels.append(label)

for x in testingTie:
    bankerCards = []
    playerCards = []
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    numPlayerCardsDrawn = myarray[10];
    numBankerCardsDrawn = myarray[11];
    for x in range(int(numBankerCardsDrawn)):
        card = myarray.pop()
        bankerCards.append(card)

    for x in range(int(numPlayerCardsDrawn)):
        card = myarray.pop()
        playerCards.append(card)

    bankerCards.sort()
    playerCards.sort()

    b.append(bankerCards)
    p.append(playerCards)

    testingdata.append(myarray)
    testingdataLabels.append(label)


count0 = 0
count1 = 0
count2 = 0
correct = 0
total = 0
percenttotal = 0
for x,label in zip(testingdata, testingdataLabels):
    numerator2 = 1.0
    numerator1 = 1.0
    numerator0 = 1.0
    denom = 1.0
    i = 0
    for y in x:

        probs0val = 1.0
        try:
            probs0val = (probs0[i][y]) + 1
        except KeyError:
            probs0val = 1.0

        probs1val = 1.0
        try:
            probs1val = (probs1[i][y]) + 1
        except KeyError:
            probs1val = 1.0


        probs2val = 1.0
        try:
            probs2val = (probs2[i][y]) + 1
        except KeyError:
            probs2val = 1.0

        #print(int(probs0val))
        #print(int(probs1val))
        numerator2 *= probs2val
        numerator2 /= total2

        numerator1 *= probs1val
        numerator1 /= total1

        numerator0 *= probs0val
        numerator0 /= total0

        denom *= (probs2val+probs1val+probs0val) / (total2 + total1 + total0)
        i += 1
    bankerCards = b.pop(0)
    playerCards = p.pop(0)
    try:
        numerator2 *= probs2[i][repr(playerCards)] + 1
    except KeyError:
        numerator2 *= 1

    numerator2 /= total2
    try:
        numerator1 *= probs1[i][repr(playerCards)] + 1
    except KeyError:
        numerator1 *= 1
    numerator1 /= total1

    try:
        numerator0 *= probs0[i][repr(playerCards)] + 1
    except KeyError:
        numerator0 *= 1
    numerator0 /= total0

    i += 1

    try:
        numerator2 *= probs2[i][repr(bankerCards)] + 1
    except KeyError:
        numerator2 *= 1
    numerator2 /= total2

    try:
        numerator1 *= probs1[i][repr(bankerCards)] + 1
    except KeyError:
        numerator1 *= 1
    numerator1 /= total1

    try:
        numerator0 *= probs0[i][repr(bankerCards)] + 1
    except KeyError:
        numerator0 *= 1
    numerator0 /= total0

    numerator2 *= total2 / (total2 + total1 + total0)
    numerator1 *= total1 / (total2 + total1 + total0)
    numerator0 *= total0 / (total2 + total1 + total0)
    numerator2 /= denom
    numerator1 /= denom
    numerator0 /= denom

    if max([numerator0, numerator1, numerator2]) == numerator0:
        predict = 0
        count0 += 1
    elif max([numerator0, numerator1, numerator2]) == numerator1:
        predict = 1
        count1 += 1

    else:
        #predict = 2
        count2 += 1
        if max([numerator0, numerator1]) == numerator0:
            predict = 0
        else:
            predict = 1

    percenttotal += 1

    if label == 2:
        correct += 1
        total += 1
    elif label == predict:
       correct += 1
       total += 1
    else:
       total += 1

print(correct)
print(total)
print(float(correct)/float(total))
print("Banker" + str(count1))
print(float(count1)/float(percenttotal))
print("Player" + str(count0))
print(float(count0)/float(percenttotal))
print("Ties" + str(count2))
print(float(count2)/float(percenttotal))
