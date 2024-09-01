import numpy as np
from sklearn import tree

trainingfile = open("trainingdata.txt", "r")

testingBanker = open("testingdataBanker.txt", "r")

testingPlayer = open("testingdataPlayer.txt", "r")

trainingdata = []

trainingdataY = []

testingdata = []

testingdataY = []

# descriptornames = ["COUNT", "HAND NUMBER", "LAST HAND RESULT", "STREAK COUNT"]
# descriptornames = ["COUNT"]
# descriptornames = ["STREAK COUNT", "BANKER IN THE LAST 10", "BANKER IN THE LAST 20", "BANKER IN THE LAST 30", "PALACE COUNT", "LAST HAND WIN"]
# descriptornames = ["STREAK COUNT", "BANKER IN THE LAST 10", "BANKER IN THE LAST 20", "BANKER IN THE LAST 30", "PLAYER IN THE LAST 10", "PLAYER IN THE LAST 20", "PLAYER IN THE LAST 30"]
# descriptornames = ["STREAK COUNT", "BANKER IN THE LAST 10", "BANKER IN THE LAST 20", "BANKER IN THE LAST 30", "PLAYER IN THE LAST 10", "PLAYER IN THE LAST 20", "PLAYER IN THE LAST 30", "LAST HAND RESULT"]
# descriptornames = ["STREAK COUNT", "SIDESTREAK COUNT", "BANKER IN THE LAST 10", "BANKER IN THE LAST 20", "BANKER IN THE LAST 30", "PLAYER IN THE LAST 10", "PLAYER IN THE LAST 20", "PLAYER IN THE LAST 30", "PLAYER ROW PERC", "BANK ROW PERC"]
descriptornames = ["#BANK WIN 5", "%BANK WIN 5", "%BANK WIN 5 ** 2", "#BANK WIN 10", "%BANK WIN 10", "%BANK WIN 10 ** 2", "#BANK WIN 20", "%BANK WIN 20", "%BANK WIN 20 ** 2", "#BANK WIN 30", "%BANK WIN 30", "%BANK WIN 30 ** 2", "LAST WINNER", "BASIC CARD COUNT", "BANKER CARD COUNT", "PLAYER CARD COUNT", "STREAK", "%SIXTRACK", "%SIXTRACK ** 2"]

labelnames = ["NOT BANKER", "BANKER"]


for x in trainingfile:
    myarray = list(map(float, x.split()))
    trainingdataY.append(myarray.pop())
    trainingdata.append(myarray)

for x in testingBanker:
    myarray = list(map(float, x.split()))
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

for x in testingPlayer:
    myarray = list(map(float, x.split()))
    testingdataY.append(myarray.pop())
    testingdata.append(myarray)

clf = tree.DecisionTreeClassifier()
clf.fit(trainingdata, trainingdataY)

predictions = clf.predict(testingdata)

#print (testingdataY)
# print (testdescriptors)
print ("\n")
#print (clf.predict(testingdata))

from sklearn.metrics import accuracy_score
print (accuracy_score(testingdataY, predictions))



# below is the code that creates the graph but right now i need to work on finding out what data is relevant
# import graphviz
# dot_data = tree.export_graphviz(clf, out_file=None, feature_names=descriptornames, class_names=labelnames, filled=True, rounded=True, special_characters=True, impurity=False)
# graph = graphviz.Source(dot_data)
# graph.render("Baccarat")
