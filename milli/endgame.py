import numpy as np
import time
trainingfile1 = open("trainingdata1.txt", "r")
trainingfile2 = open("trainingdata2.txt", "r")
trainingfile3 = open("trainingdata3.txt", "r")
trainingfile4 = open("trainingdata4.txt", "r")
trainingfile5 = open("trainingdata5.txt", "r")
trainingfile6 = open("trainingdata6.txt", "r")
trainingfile7 = open("trainingdata7.txt", "r")
trainingfile8 = open("trainingdata8.txt", "r")

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

correct = 0
total = 0

start = time.time()

for x in trainingfile1:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile2:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile3:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile4:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile5:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile6:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile7:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x in trainingfile8:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    trainingdata.append(myarray)
    trainingdataLabels.append(label)

    if label == 0:
        total0 += 1
        try:
            probs0[repr(myarray)] += 1
        except KeyError:
            probs0[repr(myarray)] = 1
    elif label == 1:
        total1 += 1
        try:
            probs1[repr(myarray)] += 1
        except KeyError:
            probs1[repr(myarray)] = 1
    elif label == 2:
        total2 += 1
        try:
            probs2[repr(myarray)] += 1
        except KeyError:
            probs2[repr(myarray)] = 1

for x,y in zip(trainingdata, trainingdataLabels):
    probs0val = 0
    probs1val = 0
    probs2val = 0

    try:
        probs0val = probs0[repr(x)]
    except KeyError:
        probs0val = 0

    try:
        probs1val = probs1[repr(x)]
    except KeyError:
        probs1val = 0

    try:
        probs2val = probs2[repr(x)]
    except KeyError:
        probs2val = 0
    #laplace smoothing
    player = float(float((probs0val + 1)/(total0))*(45.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))
    banker = float(float((probs1val + 1)/(total1))*(46.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))
    tie =    float(float((probs2val + 1)/(total2))*(8.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))

#    print("Player: " + str(player) + " Banker: " + str(banker) + " Tie: " + str(tie))
    if max([player, banker, tie]) == player:
 #       print("Player")
        predict = 0
    elif max([player, banker, tie]) == banker:
  #      print("Banker")
        predict = 1
    elif max([player, banker, tie]) == tie:
   #     print("Tie")
        predict = 2
   # print("Label: " + str(y) + " Predict: " + str(predict))
    if y == predict:
        correct += 1
        total += 1
    else:
        total += 1
perc = float(correct)/float(total)
print("Correct: " + str(correct) + " Total: " + str(total))
print("Percentage " + str(perc))

end = time.time()
print(end - start)

correct = 0
total = 0
exit()
for x in testingBanker:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    testingdata.append(myarray)
    testingdataLabels.append(label)

for x in testingPlayer:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    testingdata.append(myarray)
    testingdataLabels.append(label)

for x in testingTie:
    myarray = list(map(float, x.split()))
    label = myarray.pop()

    testingdata.append(myarray)
    testingdataLabels.append(label)

for x,y in zip(testingdata, testingdataLabels):
    probs0val = 0
    probs1val = 0
    probs2val = 0

    try:
        probs0val = probs0[repr(x)]
    except KeyError:
        probs0val = 0

    try:
        probs1val = probs1[repr(x)]
    except KeyError:
        probs1val = 0

    try:
        probs2val = probs2[repr(x)]
    except KeyError:
        probs2val = 0
    #laplace smoothing
    player = float(float((probs0val + 1)/(total0))*(45.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))
    banker = float(float((probs1val + 1)/(total1))*(46.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))
    tie =    float(float((probs2val + 1)/(total2))*(8.0/100.0))/float(float(probs0val + probs1val + probs2val + 3)/float(total0 + total1 + total2))

    print("\n")
    print("Player: " + str(player) + " Banker: " + str(banker) + " Tie: " + str(tie))
    if max([player, banker, tie]) == player:
        print("Player")
        predict = 0
    elif max([player, banker, tie]) == banker:
        print("Banker")
        predict = 1
    elif max([player, banker, tie]) == tie:
        print("Tie")
        predict = 2
    print("Label: " + str(y) + " Predict: " + str(predict))
    if y == predict:
        correct += 1
        total += 1
    else:
        total += 1
perc = float(correct)/float(total)
print("Correct: " + str(correct) + " Total: " + str(total))
print("Percentage " + str(perc))
