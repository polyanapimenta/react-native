import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Modal, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';

export default class NewRepoModal extends Component {
    state = {
        newRepoText: '',
    };

    render() {
        return(
            <Modal animationType="fade" transparent={true} visible={this.props.visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>Adicionar Repositório</Text>
                        <TextInput 
                            autoFocus={true} 
                            autoCapitalize="none" 
                            style={styles.boxInput} 
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="github username/repositório"
                            value={this.state.newRepoText}
                            onChangeText={newRepoText => this.setState({ newRepoText })} //toda vez que acontecer alguma alteração nesse texto do input, recebemos uma variável com esse texto
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.button, styles.cancelButton]} 
                                onPress={this.props.onCancel}
                            >

                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.button, styles.submitButton]} 
                                onPress={() => this.props.onAdd(this.state.newRepoText)}
                            >

                                <Text style={styles.buttonText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1, // ocupa toda a tela
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
    },

    boxTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    boxInput: {
        alignSelf: 'stretch', // ocupa toda a largura do box
        marginTop: 10,
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 40,
        borderRadius: 3,
    },
    buttonContainer: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row', // para ficar um ao lado do outro
    },
    button: {
        flex: 1, // ocupar um espeço igual para todos os filhos
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    cancelButton: {
        backgroundColor: '#e25f5f',
        marginRight: 5,
    },
    submitButton: {
        backgroundColor: '#70bd85',
        marginLeft: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 12,
    },
}); 