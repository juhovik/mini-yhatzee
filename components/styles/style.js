import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },

  footer: {
    marginTop: 50,
    backgroundColor: 'grey',
    flexDirection: 'row'
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },

  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },

  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },

  item: {
    margin: 15,
    padding: 5
  },

  flex: {
    flexDirection: "row"
  },

  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "lightblue",
    width: 180,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color:"black",
    fontSize: 20
  },

  numbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  total: {
    fontSize: 30
  }
});