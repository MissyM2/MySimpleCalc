import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { CalcButton } from '../presentations';

class Calc extends Component {
    constructor(){
        super()
        this.initial = {
            inputText: "",
            pendingOperation: null,
            firstOperand: ""
        },
        this.validKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","/","*","=","C"]; 
        this.state = this.initial;
    }

    handleInput(text){
        // "a, ab, abc"
        this.setState({
            inputText: text
        });
    }

    handleButtonInput(text){
        // If we get one of the characters below, we don't want them to be "added" together.
        // We want to perform an operation.
        if (["+","-", "*", "/"].indexOf(text) > -1){
            this.setState({
                pendingOperation: text,
                firstOperand: this.state.inputText,
                inputText: ""
            });
            return;
        }
        else if(text === "="){
            this.calculate(text);
            return;
        }
        else if(text === "C"){
            this.setState(this.initial);

        } else {
            this.setState({
                inputText: this.state.inputText + text
            });
        }

       
    }

    calculate(secondOperand) {

        let result = null;

        switch(this.state.pendingOperation){
            case "+":
                result = Number(this.state.firstOperand) + Number(this.state.inputText);
                break;
            case "-":
                result = Number(this.state.firstOperand) - Number(this.state.inputText);
                break;
            case "*":
                result = Number(this.state.firstOperand) * Number(this.state.inputText);
                break;
            case "/":
                result = Number(this.state.firstOperand) / Number(this.state.inputText);
                break;
            default:
                return;
        }
        result = result.toString();
        this.setState({
            inputText: result,
            pendinOperation: null,
            firstOperand: ""
        });

    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <TextInput 
                    onChangeText={this.handleInput.bind(this)}
                    value={this.state.inputText}
                    style={styles.input}
                    />
                    <View style={{ flex: 1, flexDirection: "column"}}>
                        {this.validKeys.map((key, i) => {
                            if (i % 2 != 0) {
                                return;
                            }
                            return (
                                <View style={styles.row}>
                                    <CalcButton 
                                        handleButtonInput={this.handleButtonInput.bind(this)}
                                        value={this.validKeys[i]} 
                                    />
                                    <CalcButton 
                                        handleButtonInput={this.handleButtonInput.bind(this)}
                                        value={this.validKeys[i + 1]} 
                                    />
                                        
                                </View>
                            ); 
                        })}
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
            backgroundColor: "rgb(41,41,41)",
            height: 150, 
            width: 100+'%',
            color: "rgb(255,255,255)",
            fontSize: 48,
            textAlign: "right"
        },  
    row: {
        flex: 1,
        flexDirection: "row"
    },
        
});

export default Calc;