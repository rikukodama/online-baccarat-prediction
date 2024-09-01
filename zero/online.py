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
    myarray = myarray
    trainingdataY.append(myarray.pop())
    trainingdata.append(myarray)


startweightsfile = open("weights.txt", "r+")
rawweights = startweightsfile.readline()
w = list(map(float, rawweights.split()))
startweightsfile.close()
# print(w)
# w = [0]*20
# print(w)


for i in range(50):
    for x,y in zip(trainingdata, trainingdataY):
        dotwx = np.dot(w,x)
        predictY = 1/(1 + math.e**(-1 * dotwx))
        changeX = [i * (predictY - y) for i in x]
        neww = [w[i] - .000000001*changeX[i] for i in range(len(x))]
        w = neww

weightsfile = open("weights.txt", "r+")
for i in w:
    weightsfile.write('%.32f ' %(i))
weightsfile.close()

testingdata = []

testingdataY = []

for x in testingBanker:
    myarray = list(map(float, x.split()))
    myarray = myarray
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

for x in testingPlayer:
    myarray = list(map(float, x.split()))
    myarray = myarray
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

correct = 0
total = 0

for x,y in zip(testingdata, testingdataY):
    mysum = 0
    for i,j in zip(w, x):
        mysum += i*j
    print(str(mysum) + " " + str(y))
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

#print(correct)
#print(total)
