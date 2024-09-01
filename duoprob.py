import numpy as np

zerofile = open("./zero/output.txt")

nonzerofile = open("./nonzero/output.txt")

labels = []

zeropredict = []

nonzeropredict = []

for x,y in zip(zerofile,nonzerofile):
    myarray = list(map(float, x.split()))
    labels = labels + [myarray.pop()]
    zeropredict = zeropredict + [myarray.pop()]

    myarray2 = list(map(float, y.split()))
    myarray2.pop()
    nonzeropredict = nonzeropredict + [myarray2.pop()]

correct = 0
total = 0

for x,y,z in zip(zeropredict, nonzeropredict, labels):
    if x > 0 and y > 0 and z == 1:
        correct+=1
        total+=1
    elif x < 0 and y < 0 and z == 0:
        correct+=1
        total+=1
    elif x > 0 and y > 0 and z == 0:
        total+=1
    elif x < 0 and y < 0 and z == 1:
        total+=1
print(correct)
print(total)
