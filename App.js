import React, {useState, useEffect} from 'react'; //biclioteca de renderizacao
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import imagexOff from './assests/icons/eco-light-off.png';
import imagexOn from './assests/icons/eco-light.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

//<Image style={style.lightOn} source={require('./assets/icons/eco-light.png')} />
const App = () => {
  // eslint-disable-next-line prettier/prettier
  const [toggle,setToggle] = useState(false);  
  //const toggle = false;
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /*
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função vai ser chamada quando o componente
    // for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightOn : style.lightOff}
          source={toggle ? imagexOn : imagexOff}
        />
        <Image
          style={toggle ? style.logoOn : style.logoOff}
          source={
            toggle
              ? require('./assests/icons/logo-dio.png')
              : require('./assests/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center', //centralizar os itens ao centro
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightOff: {
    resizeMode: 'contain', //a imagem vai se adequar ao espaco desejado
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  logoOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  logoOff: {
    resizeMode: 'contain', //a imagem vai se adequar ao espaco desejado
    alignSelf: 'center',
    tintColor: 'white',
    width: 250,
    height: 250,
  },
});
