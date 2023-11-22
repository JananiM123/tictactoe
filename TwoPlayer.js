import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import {heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Image } from 'native-base';
import CircularProgress from 'react-native-circular-progress-indicator';

const TwoPlayer = ({ navigation, route }) => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [showModal, setShowModal] = useState(false)

    let squares = [...cells];
    let win;


    const progressBar = useMemo(() => {
        if (route.params.isComputer && turn === 'o') {
            if (turn === 'o' && !win) {
                const emptySpaces = squares.reduce((acc, val, index) => {
                    if (val === '') {
                        acc.push(index);
                    }
                    return acc;
                }, [])
                if (emptySpaces.length > 0) {
                    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
                    squares[emptySpaces[randomIndex]] = 'o';
                    setTimeout(() => {
                        setCells([...squares]);
                        setTurn('x')
                    }, 1000)
                }
            }
            return <CircularProgress
                circleBackgroundColor={'black'}
                value={100}
                activeStrokeColor={'#eb5bdf'}
                activeStrokeSecondaryColor={'#23fcf5'}
            />

        }
    }, [turn])

    useEffect(() => {
        checkForWinner()
    }, [turn])

    const checkForWinner = () => {
        let tie = squares.filter(val => val === "");
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    win = squares[pattern[0]];
                }
            });
        }
        setWinner(win)

        if (tie.length === 0) {
            setGameOver(true);
        }
    }

    const handleClick = (position) => {
        if (cells[position] !== '') return;
        if (turn === 'x') {
            squares[position] = 'x';
            setCells([...squares]);
            setTurn('o');
        } else if (turn === 'o' && !route.params.isComputer) {
            squares[position] = 'o';
            setCells([...squares]);
            setTurn('x');
        }
    }

    const handleRestart = () => {
        setWinner();
        setCells(Array(9).fill(''));
        // setScore(0);
        setGameOver(false);
        setTurn('x');
    };

    useEffect(() => {
        if (winner || gameOver) {
            setShowModal(true)
        }
    }, [winner, gameOver])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <Text style={{ fontSize: hp(3.5), marginBottom: 16, color: '#e1c9f0' }}>TIC-TAC-TOE</Text>
            <Text style={{ fontSize: hp(3), color: '#e5cbf5' }}>
                {route.params.isComputer ?
                    turn == 'o' ? 'Computer' : 'Your'
                    :
                    turn.toUpperCase()
                } Turn
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                {boxes.map((position, index) => {
                    return <TouchableOpacity
                        key={index}
                        style={{
                            width: 100,
                            height: 100,
                            borderWidth: 1,
                            borderColor: '#d2b6e3',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: winner || gameOver ? 'none' : 'auto',
                            zIndex: 1,
                            position: 'relative'
                        }}
                        onPress={() => handleClick(position)}
                    >
                        {cells[position] == 'x' &&
                            <Image source={require('./x.jpeg')}
                                alt="Alternate Text"
                                size="lg" />
                        }
                        {cells[position] == 'o' &&
                            <Image source={require('./o.jpeg')}
                                alt="Alternate Text"
                                size="lg" />
                        }

                    </TouchableOpacity>
                })}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <View style={{ top: hp(5.4) }}>
                    {progressBar}
                </View>
            </View>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: hp(1) }}>
                    <View style={{
                        backgroundColor: '#e9f1f5',
                        padding: 20,
                        width: 300,
                        height: 450,
                        borderWidth: hp(2),
                        borderColor: '#ddcafa',
                        borderRadius: hp(5)
                    }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: hp(5) }}>
                                {gameOver &&
                                    <Text style={[{
                                        color: '#fa7d90',
                                        fontFamily: 'Cochin',
                                        fontSize: hp(3.2),
                                        fontWeight: 'bold'
                                    }]}> Game over! 😐</Text>
                                }
                            </View>
                            {winner &&
                                <Text style={[{
                                    color: '#b68bf7',
                                    fontFamily: 'Cochin',
                                    fontSize: hp(3),
                                    fontWeight: 'bold'
                                }]}> {winner} is the winner! 🥳</Text>
                            }
                        </View>
                        <TouchableOpacity style={{ borderWidth: 2, borderRadius: hp(3), borderColor: '#b68bf7', backgroundColor: '#ddcafa', alignItems: 'center', justifyContent: 'center', marginBottom: hp(2) }} onPress={() => {
                            setShowModal(false);
                            handleRestart();
                        }}>
                            <Text style={{ padding: hp(1), color: '#9a7bad', fontSize: hp(2), fontWeight: 500 }}>PLAY AGAIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ borderWidth: 2, borderRadius: hp(3), borderColor: '#b68bf7', backgroundColor: '#ddcafa', alignItems: 'center', justifyContent: 'center', marginBottom: hp(2) }} onPress={() => {
                            navigation.navigate('home');
                        }}>
                            <Text style={{ padding: hp(1), color: '#9a7bad', fontSize: hp(2), fontWeight: 500 }}>GO HOME</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TwoPlayer;
