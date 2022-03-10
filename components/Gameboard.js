import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from './styles/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;

export default function Gameboard() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [counts, setCounts] = useState([{ value: 0, used: true }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }]);
    const [bonus, setBonus] = useState(63);

    useEffect(() => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices.');
        } else if (nbrOfThrowsLeft > 0) {
            setStatus('Select and throw dices again.');
        } else {
            setStatus('Select your points.')
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }

    }, [nbrOfThrowsLeft])

    useEffect(() => {
        let endTrue = counts.every(count => count.used === true);
        if (endTrue) {
            setStatus('Game over. All points selected.');
        }
    }, [counts])

    const getDiceColor = (i) => {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "lightblue";
        }
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft !== NBR_OF_THROWS) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
    }

    const throwDices = () => {
        reset();
        if (nbrOfThrowsLeft !== 0) {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        } else {
            setStatus('Select your points before next throw');
        }
    }

    const reset = () => {
        console.log(status)
        if (status === "Game over. All points selected.") {
            setCounts([{ value: 0, used: true }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }, { value: 0, used: false }]);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            setStatus("Throw dices.");
        }
    }

    const selectNumbers = (i) => {
        reset();
        if (nbrOfThrowsLeft === 0) {
            if (!counts[i].used) {
                let sum = 0;
                let x;
                for (x = 0; x < board.length; x++) {
                    let diceNumber = board[x].replace('dice-', '');
                    if (diceNumber === i.toString()) {
                        sum += parseInt(diceNumber)
                    }
                }

                if (!counts[i].used) {
                    let values = [...counts];
                    values[i] = { value: sum, used: true };
                    setCounts(values);
                }
                setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                setNbrOfThrowsLeft(NBR_OF_THROWS);
            } else {
                setStatus(`You already selected points for ${i}`);
            }
        } else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points');
        }

    }

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={'row' + i}
                onPress={() => selectDice(i)}
            >
                <MaterialCommunityIcons
                    name={board[i]}
                    key={'row' + i}
                    size={50}
                    color={getDiceColor(i)}
                >
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    const getNumColor = (i) => {
        return counts[i].used ? "lightgreen" : "grey";
    }

    const numeric = [];
    for (let i = 1; i <= 6; i++) {
        numeric.push(
            <View style={styles.numbers} key={'numb' + i}>
                <Text>
                    {counts[i].value}
                </Text>
                <Pressable
                    key={'choose' + i}
                    onPress={() => selectNumbers(i)}
                >
                    <MaterialCommunityIcons
                        name={`numeric-${i}-circle`}
                        key={'num' + i}
                        size={50}
                        color={getNumColor(i)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            </View>
        );
    }


    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>
                {row}
            </View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button} onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
            <Text style={styles.total}>
                Total : {counts.reduce((a, b) => a + b.value, 0)}
            </Text>
            <Text>
                {counts.reduce((a, b) => a + b.value, 0) < bonus ? `You are ${bonus - (counts.reduce((a, b) => a + b.value, 0))} points away from bonus` : 'You got the bonus!'}
            </Text>
            <View>

            </View>
            <View style={styles.flex}>
                {numeric}
            </View>
        </View>
    );
}