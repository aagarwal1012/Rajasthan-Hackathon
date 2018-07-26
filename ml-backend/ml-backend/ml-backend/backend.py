from sklearn import tree 
from sklearn.tree import export_graphviz
import pandas as pd
import seaborn as sns
from sklearn.cross_validation import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from sklearn import tree 
import numpy as np

import base64

data = pd.read_csv("Manual-Data/Training.csv")
df = pd.DataFrame(data)
cols = df.columns
cols = cols[:-1]
x = df[cols]
y = df['prognosis']

symp = list(x.columns.values)

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
dt = DecisionTreeClassifier()
clf_dt=dt.fit(x_train, y_train)
dt.__getstate__()


from flask import Flask, jsonify, request
from sklearn.externals import joblib

import pandas as pd

app = Flask(__name__)

@app.route('/predict', methods=['GET'])
def predict():
	if request.method == 'GET':
		data = request.args.get('symptoms')
		data = str.encode(data)
		data = base64.b64decode(data)
		data = data.decode().split(',');
		m = {}
		for s in symp :
			m[s] = [0]
		for x in data:
			if x not in m:
				return "error"
			else:
				m[x] = [1]
		df = pd.DataFrame(data=m)
		result = dt.predict(df)

		return jsonify({"disease": result[0]})


if __name__ == '__main__':
	# clf = joblib.load('model.pkl')
	app.run(port=8080)