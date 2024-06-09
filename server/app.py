from flask import Flask, request, jsonify
import numpy as np
from fractions import Fraction
from flask_cors import CORS





def calculate_CR(pairwise_matrix):
    n = len(pairwise_matrix)
    # Step 1: Calculate normalized matrix
    column_sums = np.sum(pairwise_matrix, axis=0)
    normalized_matrix = pairwise_matrix / column_sums
    # Step 2: Calculate criteria weights of each row
    criteria_weights = np.mean(normalized_matrix, axis=1)
    print("Criteria Weights:", criteria_weights)
    # Step 3: Multiply each column by its corresponding criteria weight and column sum
    weighted_matrix = np.zeros_like(normalized_matrix)
    for i in range(n):
        weighted_matrix[:, i] = normalized_matrix[:, i] * criteria_weights[i] * column_sums[i]

    print("Weighted Matrix:\n", weighted_matrix)
    weighted_sums = np.sum(weighted_matrix, axis=1)
    print("Weighted Sums:", weighted_sums)
    divided_values =  weighted_sums / criteria_weights
    print("Divided:",divided_values)
    lambda_max = np.mean(divided_values)
    print("Lambda Max:", lambda_max)
    consistency_index = (lambda_max - n) / (n - 1)
    print("Consistency Index (CI):", consistency_index)

    random_index_values = {
        1: 0,
        2: 0,
        3: 0.58,
        4: 0.90,
        5: 1.12,
        6: 1.24,
        7: 1.32,
        8: 1.41,
        9: 1.45,
    }
    random_index = random_index_values.get(n)
    print("Random Index:", random_index)
    consistency_ratio = consistency_index / random_index
    print(consistency_ratio)
    result = ""
    if (consistency_ratio < 0.10):
        result = "Consistent Matrix"
    else:
        result = "Inconsistent Matrix"
    return result



# def ffwg_aggregation(ffn_matrices, weights):
#     n = len(ffn_matrices[0])  # Assuming square matrices
#     aggregated_matrix = np.ones((n, n))

#     for i in range(n):
#         for j in range(n):
#             aggregated_value = 1
#             for k in range(len(ffn_matrices)):
#                 term_score = ffn_matrices[k][i, j]
#                 term_weight = weights[k]
#                 aggregated_value *= (term_score**term_weight)

#             aggregated_matrix[i, j] = aggregated_value

#     return aggregated_matrix


def ffwg_aggregation(ffn_matrices, weights):
    # print("ffn_matrices",ffn_matrices)
    n = len(ffn_matrices[0])  # Assuming square matrices
    aggregated_matrix = np.array([[[1.0, 1.0] for _ in range(n)] for _ in range(n)])
    # print("aggregated_matrix",aggregated_matrix)
    for i in range(n):
        for j in range(n):
            aggregated_value_1 = 1
            aggregated_value_2 = 1
            for k in range(len(ffn_matrices)):
                term_score = ffn_matrices[k][i, j]
                # print("term_score",term_score)
                term_weight = 0
                for dictionary in weights:
                    if tuple(term_score) in dictionary:
                        term_weight = dictionary[tuple(term_score)]
                        break
                # print("term_weight",term_weight)
                aggregated_value_1 *= (term_score[0]**term_weight)
                aggregated_value_2 *= (term_score[1]**term_weight)
            aggregated_matrix[i, j, 0] = aggregated_value_1
            aggregated_matrix[i, j, 1] = aggregated_value_2
    return aggregated_matrix

# def ffwg_aggregation_sdrs(ffn_matrices, weights, lambda_val):
#     n = len(ffn_matrices[0])  # Assuming square matrices
#     aggregated_matrix = np.ones((n, n))

#     for i in range(n):
#         for j in range(n):
#             aggregated_value = 1
#             for k in range(len(ffn_matrices)):
#                 term_score = ffn_matrices[k][i, j]
#                 term_weight = weights[k]
#                 aggregated_value *= ((1- term_score)**term_weight)

#             aggregated_matrix[i, j] = (1 - aggregated_value)**lambda_val

#     return aggregated_matrix

def ffwg_aggregation_sdrs(ffn_matrices, weights, lambda_val):
    # rows = len(ffn_matrices)  # Assuming square matrices
    # cols = len(ffn_matrices[0])  # Assuming square matrices

    rows = ffn_matrices[0].shape[0]
    cols = ffn_matrices[0].shape[1]
    
    print("rows",rows)
    print("cols",cols)

    aggregated_matrix = np.array([[[1.0, 1.0] for _ in range(cols)] for _ in range(rows)])

    # print("aggregated_matrix",)

    for i in range(rows):
        for j in range(cols):
            aggregated_value_1 = 1
            aggregated_value_2 = 1
            for k in range(len(ffn_matrices)):
                term_score = ffn_matrices[k][i, j]
                term_weight = 0
                for dictionary in weights:
                    if tuple(term_score) in dictionary:
                        term_weight = dictionary[tuple(term_score)]
                        break
                print("term_weight",term_weight)
                aggregated_value_1 *= ((1- term_score[0])**term_weight)
                aggregated_value_2 *= ((1- term_score[1])**term_weight)
            aggregated_matrix[i, j, 0] = (1 - aggregated_value_1)**lambda_val
            aggregated_matrix[i, j, 1] = (1 - aggregated_value_2)**lambda_val

    return aggregated_matrix


# def relative_importance(matrix,weights):
#     relative_importance = []
#     transposed_matrix = zip(*matrix)
#     # Iterate over each SDR
#     for sdr in transposed_matrix:
#         # Calculate the product for each PR and sum them up
#         relative_importance_sdr = sum(pr * weight for pr, weight in zip(sdr, weights))

#         # Append the result to the list
#         relative_importance.append(relative_importance_sdr)

#     # Print the results
#     for i, importance in enumerate(relative_importance, start=1):
#         print(f"Relative Importance of SDR{i}: {importance:.3f}")
#     return relative_importance


def relative_importance(matrix, weights):
    num_columns = len(matrix[0])
    num_rows = len(matrix)
    
    relative_indexes = [0] * num_columns
    
    for col in range(num_columns):
        col_sum = [0, 0]
        for row in range(num_rows):
            col_sum[0] += weights[row] * matrix[row][col][0]
            col_sum[1] += weights[row] * matrix[row][col][1]
        relative_indexes[col] = col_sum
    
    return tuple(relative_indexes)



def calculate_score_values(matrix):
    score_values = []
    for row in matrix:
        score = sum([(p[0]**3 - p[1]**3) for p in row])
        score_values.append(score)
    return score_values








app = Flask(__name__)
cors = CORS(app,origins = "http://localhost:3000",
                methods=["GET", "POST", "PUT", "DELETE"])

# GET route to fetch all todos
@app.route('/', methods=['GET'])
def get_todos():
    return jsonify("server running")

@app.route('/', methods=['POST'])
def check():
    data = request.json
    formatted_data = [{tuple(map(float, key.split(','))): value} for item in data for key, value in item.items()]
    print("formatted_data",formatted_data)
    return jsonify("server running")

# POST route to add a new todo
@app.route('/cr', methods=['POST'])
def checkCr():
    data = request.json
    pairwise_matrix = [[float(value) for value in row] for row in data]
    print(pairwise_matrix)
    cr = calculate_CR(pairwise_matrix)
    return jsonify(cr), 201

# POST route to add a new todo
@app.route('/aggregateprs', methods=['POST'])
def aggregatePrs():
    data = request.json
    data_array = data['dataArray']
    weights = data['weights']
    print("Weights:", weights)
    print("data_array:", data_array)
    formatted_weights = [{tuple(map(float, key.split(','))): value} for item in weights for key, value in item.items()]
    np_arrays = [np.array(array) for array in data_array]
    # print("Data Array:", np_arrays)
    # print("formatted_weights:", formatted_weights)

    aggregated_matrix = ffwg_aggregation(np_arrays, formatted_weights)
    # print("aggregated_matrix",aggregated_matrix)

    return jsonify(aggregated_matrix.tolist()), 201
    # return jsonify("aggregated_matrix.tolist()"), 201


@app.route('/aggregatesdrs', methods=['POST'])
def aggregateSdrs():
    data = request.json
    data_array = data['dataArray']
    # data_array = [[[float(val) for val in row] for row in inner_array] for inner_array in data_array]
    weights = data['weights']
    formatted_weights = [{tuple(map(float, key.split(','))): value} for item in weights for key, value in item.items()]
    lambda_val = 1/3
    print("formatted_weights:", formatted_weights)
    np_arrays = [np.array(array) for array in data_array]
    print("np_arrays :", np_arrays)
    # print("Weights:", weights)

    aggregated_matrix = ffwg_aggregation_sdrs(np_arrays, formatted_weights, lambda_val)
    print("aggregated_matrix",aggregated_matrix)

    # return jsonify("aggregated_matrix.tolist()"), 201
    return jsonify(aggregated_matrix.tolist()), 201


@app.route('/ri', methods=['POST'])
def relatveImportance():
    data = request.json
    data_array = data['dataArray']
    
    weights = [float(w) for w in data['weights']] 
    np_arrays = [np.array(array) for array in data_array]
    print("Data np_arrays:", np_arrays)
    print("Weights:", weights)

    relative_value = relative_importance(np_arrays, weights)
    print("relative_importance",relative_value)

    return jsonify(relative_value), 201


@app.route('/score', methods=['POST'])
def scoreValue():
    data = request.json
    data_array = data['dataArray']
    np_arrays = [np.array(array) for array in data_array]
    score_values = calculate_score_values(np_arrays)
    print("score Value",score_values)
    return jsonify(score_values), 201


if __name__ == '__main__':
    app.run()
