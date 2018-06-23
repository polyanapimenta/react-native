import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: [],
  };

  async componentDidMount() {
    const repos = JSON.parse(await AsyncStorage.getItem('@Minicurso:repositories')) || []
    
    this.setState({ repos })
  } // buscar / carregar as informações atualizadas ao iniciar o app
  
  _addRepository = async (newRepoText) => {
    const repoCall = await fetch(`https://api.github.com/repos/${newRepoText}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login,
    };

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos, // vai copiar todos os itens do array do repositorio
        repository,
      ], // todos os itens do array de repositorios e add esse novo item/repositorio no final da lista
    });

    await AsyncStorage.setItem('@Minicurso:repositories', JSON.stringify(this.state.repos)); // salvar as info localmente no dispositivo
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>React Native - Listagem de Repositórios</Text>

          <TouchableOpacity onPress={() => this.setState({ modalVisible:true })}>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          { this.state.repos.map(repo => <Repo key={repo.id} data={repo} />)}
        </ScrollView>

        <NewRepoModal 
          onCancel={() => this.setState({ modalVisible: false })} 
          onAdd={this._addRepository}
          visible={ this.state.modalVisible } 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#fff',
    flexDirection: 'row', // item ficar um ao lado do outro
    alignItems: 'center', // alinhar itens horizontalmente ao centro
    justifyContent: 'space-between', // deixar os itens cada um em uma extremidade da tela
    paddingHorizontal: 20, // para ficar com os cantos (left/right) com espaço
  },
  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  repoList: {
    padding: 20,
  },
});
