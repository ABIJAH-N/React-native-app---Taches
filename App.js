import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Button, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.tache = ''
    this.detail = ''
    this.i = 0
    var taches = []
    for (this.i = 0; this.i < 11; this.i++) {
      taches.push({ id: this.i, tache: 'Tache ' + this.i, detail: 'Detail ' + this.i})
    }
    this.state = {
      listeTache: taches,
      visible: false
    }
  }

  addElementToList = () => {
    this.state.listeTache.unshift({ id: this.i, tache: this.tache, detail: this.detail })
    this.setState({ 
      listeTache : this.state.listeTache,
      visible: false
    })
    this.i ++
  }

  DeleteElementFromList = ({ item }) => {
    const { listeTache } = this.state
    console.log(listeTache.splice(listeTache.indexOf(item), 1))
    this.setState({
      listeTache: listeTache
    })
  }


  render(){
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="black" />

        {this.state.visible && (
          <View>
            <View style={{marginTop: 10}}>
              <TextInput placeholder='Nouvelle tâche' style={styles.addElement} onChangeText={(text) => this.tache = text}/>
              <TextInput placeholder='Détail' style={[styles.addElement, { marginBottom: 10 }]} onChangeText={(text) => this.detail = text}/>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Button title="Ajouter" onPress={() => this.addElementToList() } />
            </View>
          </View >
        )}

        {!this.state.visible && (
          <View style={{ marginBottom: 10, marginTop : 10 }}>
            <Button title="Nouveau" style={{marginBottom: 10}} onPress = {() => this.setState({ visible: true })} />
          </View>
        )}

      <FlatList
          onEndReachedThreshold={0.5}
          data={this.state.listeTache}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {

            return (
              <View style={styles.element}>

                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                  <Text style={{ fontSize: 16 }}>{item.tache}</Text>
                  <Text>{item.detail}</Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity style={styles.cancelView} onPress={() => this.DeleteElementFromList({ item })}>
                    <Text style = {{ color: 'white', textAlign : 'center' }}>X</Text>
                  </TouchableOpacity>
                </View>

              </View>
            )
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  element: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(157, 211, 255)',
    marginBottom: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  addElement: {
    fontSize: 17,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    padding: 10,
    textAlign: 'center'
  },
  cancelView : {
    right: 0,
    backgroundColor: '#de897e',
    justifyContent: 'center',
    borderRadius: 30,
    height: 30,
    width: 30
  }
});
