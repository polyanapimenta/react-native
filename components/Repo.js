import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Repo extends Component {
    render() {
        return (
            <View style={styles.repo}>
                <Image style={styles.repoImage} source={{ uri: this.props.data.thumbnail }}/>
                <View style={styles.repoInfo}>
                    <Text style={styles.repoTitle}>{ this.props.data.title }</Text>
                    <Text style={styles.repoAuthor}>{ this.props.data.author }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    repo: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row', //direção dos itens um ao lado do outro, distribuidos horizontalmente
        alignItems: 'center' // itens alinhados horizontalmente ao centro
    },

    repoImage: {
        width: 65,
        height: 65,
        borderRadius: 25,
    },

    repoInfo: {
        marginLeft: 10,
    },

    repoTitle: {
        fontWeight: 'bold',
        color: '#333',
    },

    repoAuthor: {
        fontSize: 12,
        color: '#999',
    },
});