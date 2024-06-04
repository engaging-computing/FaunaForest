import os
from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime
import re

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('instructions.html')
    '''
    if request.method == 'POST':
        input1 = request.form['input1']
        input2 = request.form['input2']
        input3 = request.form['input3']

        concatenated_string = input1 + input2 + input3
        file_name = f'DataFolder/{concatenated_string}.txt'
        with open(file_name, 'w') as file:
            file.write(f'Name: {input1} {input2}\n')
            file.write(f'Grade level: {input3}\n')
            file.write('Identifier, Grade, Timestamp, Seconds Spent on Puzzle, Level, Accuracy, Number of Puzzles\n')
        
        # Store file name in session
        session['file_name'] = file_name
        
        return redirect(url_for('index'))  
    else:
        return render_template('instructions.html')
    '''
    
@app.route('/level1')
def level1():
    return render_template('puzzle1.html')


@app.route('/level2')
def level2():
    return render_template('puzzle2.html')

@app.route('/level3')
def level3():
    return render_template('puzzle3.html')

@app.route('/dataFolder', methods=['POST'])
def save_data():
    '''
    data = request.json 
    value = data.get('value', '')

    file_name = session['file_name']
    filenameSubstring = file_name.split('/', 1)[-1]
    gradeIndex = filenameSubstring.index('.txt') - 1

    grade = filenameSubstring[gradeIndex: gradeIndex+1]

    identifier = filenameSubstring[:filenameSubstring.index('.txt') - 1]


    valueToWrite = identifier + ", " + grade + ", " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "," + str(value)

    # Ensure value is a string
    if not isinstance(valueToWrite, str):
        valueToWrite = str(valueToWrite)

    # Retrieve file name from session
    file_name = session.get('file_name')

    if file_name:
        # Save the data to the file
        with open(file_name, 'a') as file:
            file.write('\n' + valueToWrite)  
        return 'Data saved successfully'
    else:
        return 'File name not found in session'
    '''

if __name__ == '__main__':
    app.run(debug=True, port=8000)

