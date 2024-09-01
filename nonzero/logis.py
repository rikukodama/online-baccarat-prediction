import sys
import numpy as np
import math

trainingfile = open("trainingdata.txt", "r")

testingBanker = open("testingdataBanker.txt", "r")

testingPlayer = open("testingdataPlayer.txt", "r")

trainingdata = []

trainingdataY = []

for x in trainingfile:
    myarray = list(map(float, x.split()))
    myarray = [1] + myarray
    trainingdataY.append(myarray.pop())
    trainingdata.append(myarray)

w = [0]*8

gradientw = [0]*8
for count in range(1):
    for x,y in zip(trainingdata, trainingdataY):
        dotwx = np.dot(w,x)
        predictY = 1/(1 + math.e**(-dotwx))
        changeX = [i * (predictY - y) for i in x]
        newgradientw = [gradientw[i] + changeX[i] for i in range(len(x))]
        gradientw = newgradientw
    neww = [w[i] - .01*gradientw[i] for i in range(len(w))]
    w = neww

testingdata = []

testingdataY = []

for x in testingBanker:
    myarray = list(map(float, x.split()))
    myarray = [1] + myarray
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

for x in testingPlayer:
    myarray = list(map(float, x.split()))
    myarray = [1] + myarray
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

correct = 0
total = 0
for x,y in zip(testingdata, testingdataY):
    mysum = 0
    for i,j in zip(w, x):
        mysum += i*j
    print("Predicted: " + str(mysum) + " Actual: " + str(y))
    #if mysum > 0 :
    #    print("Predicted: " + str(1) + " Actual: " + str(y))
    #else:
    #    print("Predicted: " + str(0) + " Actual: " + str(y))

    if mysum > 0 and y == 1 :
        correct += 1
        total += 1
    elif mysum < 0 and y == 0 :
        correct += 1
        total += 1
    else:
        total += 1

print(correct)
print(total)


