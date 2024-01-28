import pandas as pd
import joblib
from scraping import get_data
import warnings

warnings.filterwarnings('ignore')

LOADED_LR = joblib.load('logistic_regression_model.pkl')
LOADED_CVEC = joblib.load('count_vectorizer.pkl')
SIZE = 5


def make_prediction(data, cvec, lr):
    # Transform the new data using the already fitted CountVectorizer
    predictions = []
    for datum in data:
        new_data_transformed = pd.DataFrame(cvec.transform([datum]).todense(), columns=cvec.get_feature_names_out())

        # Make predictions using the Logistic Regression model
        dem_percentage = round(lr.predict_proba(new_data_transformed)[0][1] * 100)
        rep_percentage = round(lr.predict_proba(new_data_transformed)[0][0] * 100)

        if dem_percentage < 40 or dem_percentage > 60:
            pass
        else:
            dem_percentage = 0
            rep_percentage = 0

        predictions.append([rep_percentage, dem_percentage])
    return predictions


def format_data(content, num_articles):
    # combine title and content and return new list
    tags = []
    for item in content.values():
        for i in range(num_articles):
            tags.append(item[0][i] + " " + item[1][i])
    return tags


def output_data(output_dict, prediction, size):
    values = [prediction[0:5], prediction[5:10], prediction[10:15], prediction[15:20]]
    count = 0
    for key in js.keys():
        output_dict[key][0] = values[count]
        output_dict[key][1] = output_dict[key][1][0:size]
        output_dict[key][2] = output_dict[key][2][0:size]
        output_dict[key][3] = output_dict[key][3][0:size]

        count += 1

    return output_dict

search_term = ""
ai, js = get_data(search_term)
tags = format_data(ai, 5)
pred = make_prediction(tags, LOADED_CVEC, LOADED_LR)
output = output_data(js, pred, SIZE)